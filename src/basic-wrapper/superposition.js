"use strict";
/**
 * Copyright (c) 2019 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.dynamicSuperpositionTest = exports.StaticSuperpositionTestData = exports.buildStaticSuperposition = void 0;
var linear_algebra_1 = require("molstar/lib/mol-math/linear-algebra");
var structure_1 = require("molstar/lib/mol-model/structure");
var superposition_1 = require("molstar/lib/mol-model/structure/structure/util/superposition");
var builder_1 = require("molstar/lib/mol-script/language/builder");
var compiler_1 = require("molstar/lib/mol-script/runtime/query/compiler");
var transforms_1 = require("molstar/lib/mol-plugin-state/transforms");
var assets_1 = require("molstar/lib/mol-util/assets");
function buildStaticSuperposition(plugin, src) {
    var _this = this;
    return plugin.dataTransaction(function () { return __awaiter(_this, void 0, void 0, function () {
        var _i, src_1, s, structure, chain;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, src_1 = src;
                    _a.label = 1;
                case 1:
                    if (!(_i < src_1.length)) return [3 /*break*/, 7];
                    s = src_1[_i];
                    return [4 /*yield*/, loadStructure(plugin, "https://www.ebi.ac.uk/pdbe/static/entry/" + s.pdbId + "_updated.cif", 'mmcif')];
                case 2:
                    structure = (_a.sent()).structure;
                    return [4 /*yield*/, transform(plugin, structure, s.matrix)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, plugin.builders.structure.tryCreateComponentFromExpression(structure, chainSelection(s.auth_asym_id), "Chain " + s.auth_asym_id)];
                case 4:
                    chain = _a.sent();
                    if (!chain) return [3 /*break*/, 6];
                    return [4 /*yield*/, plugin.builders.structure.representation.addRepresentation(chain, { type: 'cartoon' })];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 1];
                case 7: return [2 /*return*/];
            }
        });
    }); });
}
exports.buildStaticSuperposition = buildStaticSuperposition;
exports.StaticSuperpositionTestData = [
    {
        pdbId: '1aj5', auth_asym_id: 'A', matrix: linear_algebra_1.Mat4.identity()
    },
    {
        pdbId: '1df0', auth_asym_id: 'B', matrix: linear_algebra_1.Mat4.ofRows([
            [0.406, 0.879, 0.248, -200.633],
            [0.693, -0.473, 0.544, 73.403],
            [0.596, -0.049, -0.802, -14.209],
            [0, 0, 0, 1]
        ])
    },
    {
        pdbId: '1dvi', auth_asym_id: 'A', matrix: linear_algebra_1.Mat4.ofRows([
            [-0.053, -0.077, 0.996, -45.633],
            [-0.312, 0.949, 0.057, -12.255],
            [-0.949, -0.307, -0.074, 53.562],
            [0, 0, 0, 1]
        ])
    }
];
function dynamicSuperpositionTest(plugin, src, comp_id) {
    var _this = this;
    return plugin.dataTransaction(function () { return __awaiter(_this, void 0, void 0, function () {
        var _i, src_2, s, pivot, rest, query, xs, selections, transforms, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, src_2 = src;
                    _a.label = 1;
                case 1:
                    if (!(_i < src_2.length)) return [3 /*break*/, 4];
                    s = src_2[_i];
                    return [4 /*yield*/, loadStructure(plugin, "https://www.ebi.ac.uk/pdbe/static/entry/" + s + "_updated.cif", 'mmcif')];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    pivot = builder_1.MolScriptBuilder.struct.filter.first([
                        builder_1.MolScriptBuilder.struct.generator.atomGroups({
                            'residue-test': builder_1.MolScriptBuilder.core.rel.eq([builder_1.MolScriptBuilder.struct.atomProperty.macromolecular.label_comp_id(), comp_id]),
                            'group-by': builder_1.MolScriptBuilder.struct.atomProperty.macromolecular.residueKey()
                        })
                    ]);
                    rest = builder_1.MolScriptBuilder.struct.modifier.exceptBy({
                        0: builder_1.MolScriptBuilder.struct.modifier.includeSurroundings({
                            0: pivot,
                            radius: 5
                        }),
                        by: pivot
                    });
                    query = compiler_1.compile(pivot);
                    xs = plugin.managers.structure.hierarchy.current.structures;
                    selections = xs.map(function (s) { return structure_1.StructureSelection.toLociWithCurrentUnits(query(new structure_1.QueryContext(s.cell.obj.data))); });
                    transforms = superposition_1.superpose(selections);
                    return [4 /*yield*/, siteVisual(plugin, xs[0].cell, pivot, rest)];
                case 5:
                    _a.sent();
                    i = 1;
                    _a.label = 6;
                case 6:
                    if (!(i < selections.length)) return [3 /*break*/, 10];
                    return [4 /*yield*/, transform(plugin, xs[i].cell, transforms[i - 1].bTransform)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, siteVisual(plugin, xs[i].cell, pivot, rest)];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    i++;
                    return [3 /*break*/, 6];
                case 10: return [2 /*return*/];
            }
        });
    }); });
}
exports.dynamicSuperpositionTest = dynamicSuperpositionTest;
function siteVisual(plugin, s, pivot, rest) {
    return __awaiter(this, void 0, void 0, function () {
        var center, surr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, plugin.builders.structure.tryCreateComponentFromExpression(s, pivot, 'pivot')];
                case 1:
                    center = _a.sent();
                    if (!center) return [3 /*break*/, 3];
                    return [4 /*yield*/, plugin.builders.structure.representation.addRepresentation(center, { type: 'ball-and-stick', color: 'residue-name' })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, plugin.builders.structure.tryCreateComponentFromExpression(s, rest, 'rest')];
                case 4:
                    surr = _a.sent();
                    if (!surr) return [3 /*break*/, 6];
                    return [4 /*yield*/, plugin.builders.structure.representation.addRepresentation(surr, { type: 'ball-and-stick', color: 'uniform', size: 'uniform', sizeParams: { value: 0.33 } })];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
function loadStructure(plugin, url, format, assemblyId) {
    return __awaiter(this, void 0, void 0, function () {
        var data, trajectory, model, structure;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, plugin.builders.data.download({ url: assets_1.Asset.Url(url) })];
                case 1:
                    data = _a.sent();
                    return [4 /*yield*/, plugin.builders.structure.parseTrajectory(data, format)];
                case 2:
                    trajectory = _a.sent();
                    return [4 /*yield*/, plugin.builders.structure.createModel(trajectory)];
                case 3:
                    model = _a.sent();
                    return [4 /*yield*/, plugin.builders.structure.createStructure(model, assemblyId ? { name: 'assembly', params: { id: assemblyId } } : void 0)];
                case 4:
                    structure = _a.sent();
                    return [2 /*return*/, { data: data, trajectory: trajectory, model: model, structure: structure }];
            }
        });
    });
}
function chainSelection(auth_asym_id) {
    return builder_1.MolScriptBuilder.struct.generator.atomGroups({
        'chain-test': builder_1.MolScriptBuilder.core.rel.eq([builder_1.MolScriptBuilder.struct.atomProperty.macromolecular.auth_asym_id(), auth_asym_id])
    });
}
function transform(plugin, s, matrix) {
    var b = plugin.state.data.build().to(s)
        .insert(transforms_1.StateTransforms.Model.TransformStructureConformation, { transform: { name: 'matrix', params: { data: matrix, transpose: false } } });
    return plugin.runTask(plugin.state.data.updateTree(b));
}
