/**
 * Copyright (c) 2019 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */

import { EmptyLoci } from 'molstar/lib/mol-model/loci';
import { StructureSelection } from 'molstar/lib/mol-model/structure';
import { align } from 'molstar/lib/mol-model/sequence/alignment/alignment';
import { createPlugin, DefaultPluginSpec } from 'molstar/lib/mol-plugin';
// import { AnimateModelIndex } from 'molstar/lib/mol-plugin-state/animation/built-in';
import { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory';
import { PluginCommands } from 'molstar/lib/mol-plugin/commands';
import { PluginContext } from 'molstar/lib/mol-plugin/context';
import { Script } from 'molstar/lib/mol-script/script';
import { Color } from 'molstar/lib/mol-util/color';
import { StripedResidues } from './coloring';
// import { CustomToastMessage } from './controls';
import { buildStaticSuperposition, dynamicSuperpositionTest, StaticSuperpositionTestData } from './superposition';
import { PDBeStructureQualityReport } from 'molstar/lib/extensions/pdbe';
import { Asset } from 'molstar/lib/mol-util/assets';
require('molstar/lib/mol-plugin-ui/skin/light.scss');

type LoadParams = { pdbIds: string[], format?: BuiltInTrajectoryFormat, isBinary?: boolean, assemblyId?: string, resultSelected: boolean }
type Residue = { residueName: string, residueChainName: string, residueId: string, residueAltLoc: string, identifier: string }

export default class BasicWrapper {
    plugin: PluginContext;
    selectedProteins: Array<string> = [];

    init(target: string | HTMLElement) {
        this.plugin = createPlugin(typeof target === 'string' ? document.getElementById(target)! : target, {
            ...DefaultPluginSpec,
            layout: {
                initial: {
                    isExpanded: false,
                    showControls: false
                },
                controls: {
                    // left: 'none'
                }
            },
            components: {
                remoteState: 'none'
            }
        });

        this.plugin.representation.structure.themes.colorThemeRegistry.add(StripedResidues.colorThemeProvider!);
        this.plugin.managers.lociLabels.addProvider(StripedResidues.labelProvider!);
        this.plugin.customModelProperties.register(StripedResidues.propertyProvider, true);
    }

    async renderProtein(format: BuiltInTrajectoryFormat, isBinary: boolean, assemblyId: string) {
        await this.plugin.clear();
        this.selectedProteins.forEach(async (pdbId) => {
            let url = 'https://files.rcsb.org/download/' + pdbId + '.cif';
            const data = await this.plugin.builders.data.download({ url: Asset.Url(url), isBinary }, { state: { isGhost: true } });
            const trajectory = await this.plugin.builders.structure.parseTrajectory(data, format);
            const model = await this.plugin.builders.structure.createModel(trajectory);
            const structure = await this.plugin.builders.structure.createStructure(model, assemblyId ? { name: 'assembly', params: { id: assemblyId } } : void 0);
            await this.plugin.builders.structure.hierarchy.applyPreset(trajectory, 'default', {
                structure: assemblyId ? {
                    name: 'assembly',
                    params: { id: assemblyId }
                } : {
                    name: 'model',
                    params: { }
                },
                showUnitcell: false,
                representationPreset: 'auto',
                representationPresetParams: {
                    ignoreHydrogens: true
                }
            });
        });
    }

    async load({ pdbIds, format = 'mmcif', isBinary = false, assemblyId = '', resultSelected = false }: LoadParams) {
        this.selectedProteins = [];
        this.selectedProteins.push(...pdbIds);
        await this.renderProtein(format, isBinary, assemblyId);
    }

    async dynamicSuperposition(pdbIds: string[], aligned: Residue[]) {
        let residues: string[] = []
        for (const residue of aligned) {
            residues.push(residue.residueName);
        }


        await this.plugin.clear()
        return dynamicSuperpositionTest(this.plugin, pdbIds, residues);
    }

    setBackground(color: number) {
        PluginCommands.Canvas3D.SetSettings(this.plugin, { settings: props => { props.renderer.backgroundColor = Color(color); } });
    }

    toggleSpin() {
        if (!this.plugin.canvas3d) return;

        PluginCommands.Canvas3D.SetSettings(this.plugin, {
            settings: props => {
                props.trackball.spin = !props.trackball.spin;
            }
        });
        if (!this.plugin.canvas3d.props.trackball.spin) PluginCommands.Camera.Reset(this.plugin, {});
    }

    // animate = {
    //     modelIndex: {
    //         maxFPS: 8,
    //         onceForward: () => { this.plugin.managers.animation.play(AnimateModelIndex, { maxFPS: Math.max(0.5, this.animate.modelIndex.maxFPS | 0), mode: { name: 'once', params: { direction: 'forward' } } }); },
    //         onceBackward: () => { this.plugin.managers.animation.play(AnimateModelIndex, { maxFPS: Math.max(0.5, this.animate.modelIndex.maxFPS | 0), mode: { name: 'once', params: { direction: 'backward' } } }); },
    //         palindrome: () => { this.plugin.managers.animation.play(AnimateModelIndex, { maxFPS: Math.max(0.5, this.animate.modelIndex.maxFPS | 0), mode: { name: 'palindrome', params: {} } }); },
    //         loop: () => { this.plugin.managers.animation.play(AnimateModelIndex, { maxFPS: Math.max(0.5, this.animate.modelIndex.maxFPS | 0), mode: { name: 'loop', params: {} } }); },
    //         stop: () => this.plugin.managers.animation.stop()
    //     }
    // }

    coloring = {
        applyStripes: async () => {
            this.plugin.dataTransaction(async () => {
                for (const s of this.plugin.managers.structure.hierarchy.current.structures) {
                    await this.plugin.managers.structure.component.updateRepresentationsTheme(s.components, { color: StripedResidues.propertyProvider.descriptor.name as any });
                }
            });
        },
        applyDefault: async () => {
            this.plugin.dataTransaction(async () => {
                for (const s of this.plugin.managers.structure.hierarchy.current.structures) {
                    await this.plugin.managers.structure.component.updateRepresentationsTheme(s.components, { color: 'default' });
                }
            });
        }
    }

    interactivity = {
        highlightOn: () => {
            const data = this.plugin.managers.structure.hierarchy.current.structures[0]?.cell.obj?.data;
            if (!data) return;

            const seq_id = 7;
            const sel = Script.getStructureSelection(Q => Q.struct.generator.atomGroups({
                'residue-test': Q.core.rel.eq([Q.struct.atomProperty.macromolecular.label_seq_id(), seq_id]),
                'group-by': Q.struct.atomProperty.macromolecular.residueKey()
            }), data);
            const loci = StructureSelection.toLociWithSourceUnits(sel);
            this.plugin.managers.interactivity.lociHighlights.highlightOnly({ loci });
        },
        clearHighlight: () => {
            this.plugin.managers.interactivity.lociHighlights.highlightOnly({ loci: EmptyLoci });
        }
    }
}

// (window as any).BasicMolStarWrapper = new BasicWrapper();
