/**
 * Copyright (c) 2019 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */

import { Mat4 } from 'molstar/lib/mol-math/linear-algebra';
import { QueryContext, StructureSelection } from 'molstar/lib/mol-model/structure';
import { superpose } from 'molstar/lib/mol-model/structure/structure/util/superposition';
import { PluginStateObject as PSO } from 'molstar/lib/mol-plugin-state/objects';
import { PluginContext } from 'molstar/lib/mol-plugin/context';
import { MolScriptBuilder as MS } from 'molstar/lib/mol-script/language/builder';
import Expression from 'molstar/lib/mol-script/language/expression';
import { compile } from 'molstar/lib/mol-script/runtime/query/compiler';
import { StateObjectRef } from 'molstar/lib/mol-state';
import { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory';
import { StateTransforms } from 'molstar/lib/mol-plugin-state/transforms';
import { Asset } from 'molstar/lib/mol-util/assets';

// Superposes proteins on their active sites
//
// Note: Currently only works with one active site at a time.
// The alignements also do not return an RMSD value so they do not visualy align.
export async function dynamicSuperpositionTest(plugin: PluginContext, src: string[], aligned: string[]) {
    return plugin.dataTransaction(async () => {
        
        // This for loop is an attempt to load multiple active sites but it just results in the latest active site in the aligned array being rendered.
        // Some where further down this function the previous alignment is being cleared but it is not apparent where that is happening.
        // The idea is to render all alignments at once just like how NGL viewer does it.
        for (const s of src) {
            await loadStructure(plugin, `https://files.rcsb.org/download/${s}.cif`, 'mmcif');
        }

        for (const residue of aligned) {
            const pivot = MS.struct.filter.first([
                MS.struct.generator.atomGroups({
                    'residue-test': MS.core.rel.eq([MS.struct.atomProperty.macromolecular.label_comp_id(), residue]),
                    'group-by': MS.struct.atomProperty.macromolecular.residueKey()
                })
            ]);

            const rest = MS.struct.modifier.exceptBy({
                0: MS.struct.modifier.includeSurroundings({
                    0: pivot,
                    radius: 5
                }),
                by: pivot
            });

            const query = compile<StructureSelection>(pivot);
            const xs = plugin.managers.structure.hierarchy.current.structures;
            const selections = xs.map(s => StructureSelection.toLociWithCurrentUnits(query(new QueryContext(s.cell.obj!.data))));

            const transforms = superpose(selections);
            await siteVisual(plugin, xs[0].cell, pivot, rest); // loads first protein active site
            for (let i = 1; i < selections.length; i++) {
                await transform(plugin, xs[i].cell, transforms[i - 1].bTransform);
                await siteVisual(plugin, xs[i].cell, pivot, rest); // loads second protein active site
            }
        }
    });
}

async function siteVisual(plugin: PluginContext, s: StateObjectRef<PSO.Molecule.Structure>, pivot: Expression, rest: Expression) {
    const center = await plugin.builders.structure.tryCreateComponentFromExpression(s, pivot, 'pivot');
    if (center) await plugin.builders.structure.representation.addRepresentation(center, { type: 'ball-and-stick', color: 'residue-name' });

    const surr = await plugin.builders.structure.tryCreateComponentFromExpression(s, rest, 'rest');
    if (surr) await plugin.builders.structure.representation.addRepresentation(surr, { type: 'ball-and-stick', color: 'uniform', size: 'uniform', sizeParams: { value: 0.33 } });
}

async function loadStructure(plugin: PluginContext, url: string, format: BuiltInTrajectoryFormat, assemblyId?: string) {
    const data = await plugin.builders.data.download({ url: Asset.Url(url), isBinary: false }, { state: { isGhost: true } });
    const trajectory = await plugin.builders.structure.parseTrajectory(data, format);
    const model = await plugin.builders.structure.createModel(trajectory);
    const structure = await plugin.builders.structure.createStructure(model, assemblyId ? { name: 'assembly', params: { id: assemblyId } } : void 0);

    return { data, trajectory, model, structure };
}

function transform(plugin: PluginContext, s: StateObjectRef<PSO.Molecule.Structure>, matrix: Mat4) {
    const b = plugin.state.data.build().to(s)
        .insert(StateTransforms.Model.TransformStructureConformation, { transform: { name: 'matrix', params: { data: matrix, transpose: false } } });
    return plugin.runTask(plugin.state.data.updateTree(b));
}