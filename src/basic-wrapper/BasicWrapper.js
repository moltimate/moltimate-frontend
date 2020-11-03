"use strict";
/**
 * Copyright (c) 2019 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var loci_1 = require("molstar/lib/mol-model/loci");
var structure_1 = require("molstar/lib/mol-model/structure");
var mol_plugin_1 = require("molstar/lib/mol-plugin");
var built_in_1 = require("molstar/lib/mol-plugin-state/animation/built-in");
var commands_1 = require("molstar/lib/mol-plugin/commands");
var script_1 = require("molstar/lib/mol-script/script");
var color_1 = require("molstar/lib/mol-util/color");
var coloring_1 = require("./coloring");
var controls_1 = require("./controls");
var superposition_1 = require("./superposition");
var pdbe_1 = require("molstar/lib/extensions/pdbe");
var assets_1 = require("molstar/lib/mol-util/assets");
// require('molstar/lib/mol-plugin-ui/skin/light.scss');
var BasicWrapper = /** @class */ (function () {
    function BasicWrapper() {
        var _this = this;
        this.animate = {
            modelIndex: {
                maxFPS: 8,
                onceForward: function () { _this.plugin.managers.animation.play(built_in_1.AnimateModelIndex, { maxFPS: Math.max(0.5, _this.animate.modelIndex.maxFPS | 0), mode: { name: 'once', params: { direction: 'forward' } } }); },
                onceBackward: function () { _this.plugin.managers.animation.play(built_in_1.AnimateModelIndex, { maxFPS: Math.max(0.5, _this.animate.modelIndex.maxFPS | 0), mode: { name: 'once', params: { direction: 'backward' } } }); },
                palindrome: function () { _this.plugin.managers.animation.play(built_in_1.AnimateModelIndex, { maxFPS: Math.max(0.5, _this.animate.modelIndex.maxFPS | 0), mode: { name: 'palindrome', params: {} } }); },
                loop: function () { _this.plugin.managers.animation.play(built_in_1.AnimateModelIndex, { maxFPS: Math.max(0.5, _this.animate.modelIndex.maxFPS | 0), mode: { name: 'loop', params: {} } }); },
                stop: function () { return _this.plugin.managers.animation.stop(); }
            }
        };
        this.coloring = {
            applyStripes: function () { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    this.plugin.dataTransaction(function () { return __awaiter(_this, void 0, void 0, function () {
                        var _i, _a, s;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _i = 0, _a = this.plugin.managers.structure.hierarchy.current.structures;
                                    _b.label = 1;
                                case 1:
                                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                                    s = _a[_i];
                                    return [4 /*yield*/, this.plugin.managers.structure.component.updateRepresentationsTheme(s.components, { color: coloring_1.StripedResidues.propertyProvider.descriptor.name })];
                                case 2:
                                    _b.sent();
                                    _b.label = 3;
                                case 3:
                                    _i++;
                                    return [3 /*break*/, 1];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); },
            applyDefault: function () { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    this.plugin.dataTransaction(function () { return __awaiter(_this, void 0, void 0, function () {
                        var _i, _a, s;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _i = 0, _a = this.plugin.managers.structure.hierarchy.current.structures;
                                    _b.label = 1;
                                case 1:
                                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                                    s = _a[_i];
                                    return [4 /*yield*/, this.plugin.managers.structure.component.updateRepresentationsTheme(s.components, { color: 'default' })];
                                case 2:
                                    _b.sent();
                                    _b.label = 3;
                                case 3:
                                    _i++;
                                    return [3 /*break*/, 1];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); }
        };
        this.interactivity = {
            highlightOn: function () {
                var _a, _b;
                var data = (_b = (_a = _this.plugin.managers.structure.hierarchy.current.structures[0]) === null || _a === void 0 ? void 0 : _a.cell.obj) === null || _b === void 0 ? void 0 : _b.data;
                if (!data)
                    return;
                var seq_id = 7;
                var sel = script_1.Script.getStructureSelection(function (Q) { return Q.struct.generator.atomGroups({
                    'residue-test': Q.core.rel.eq([Q.struct.atomProperty.macromolecular.label_seq_id(), seq_id]),
                    'group-by': Q.struct.atomProperty.macromolecular.residueKey()
                }); }, data);
                var loci = structure_1.StructureSelection.toLociWithSourceUnits(sel);
                _this.plugin.managers.interactivity.lociHighlights.highlightOnly({ loci: loci });
            },
            clearHighlight: function () {
                _this.plugin.managers.interactivity.lociHighlights.highlightOnly({ loci: loci_1.EmptyLoci });
            }
        };
        this.tests = {
            staticSuperposition: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.plugin.clear()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, superposition_1.buildStaticSuperposition(this.plugin, superposition_1.StaticSuperpositionTestData)];
                    }
                });
            }); },
            dynamicSuperposition: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.plugin.clear()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, superposition_1.dynamicSuperpositionTest(this.plugin, ['1tqn', '2hhb', '4hhb'], 'HEM')];
                    }
                });
            }); },
            toggleValidationTooltip: function () {
                return _this.plugin.state.updateBehavior(pdbe_1.PDBeStructureQualityReport, function (params) { params.showTooltip = !params.showTooltip; });
            },
            showToasts: function () {
                commands_1.PluginCommands.Toast.Show(_this.plugin, {
                    title: 'Toast 1',
                    message: 'This is an example text, timeout 3s',
                    key: 'toast-1',
                    timeoutMs: 3000
                });
                commands_1.PluginCommands.Toast.Show(_this.plugin, {
                    title: 'Toast 2',
                    message: controls_1.CustomToastMessage,
                    key: 'toast-2'
                });
            },
            hideToasts: function () {
                commands_1.PluginCommands.Toast.Hide(_this.plugin, { key: 'toast-1' });
                commands_1.PluginCommands.Toast.Hide(_this.plugin, { key: 'toast-2' });
            }
        };
    }
    BasicWrapper.prototype.init = function (target) {
        this.plugin = mol_plugin_1.createPlugin(typeof target === 'string' ? document.getElementById(target) : target, __assign(__assign({}, mol_plugin_1.DefaultPluginSpec), { layout: {
                initial: {
                    isExpanded: false,
                    showControls: false
                },
                controls: {
                // left: 'none'
                }
            }, components: {
                remoteState: 'none'
            } }));
        this.plugin.representation.structure.themes.colorThemeRegistry.add(coloring_1.StripedResidues.colorThemeProvider);
        this.plugin.managers.lociLabels.addProvider(coloring_1.StripedResidues.labelProvider);
        this.plugin.customModelProperties.register(coloring_1.StripedResidues.propertyProvider, true);
    };
    BasicWrapper.prototype.load = function (_a) {
        console.log(_a);
        var url = _a.url, _b = _a.format, format = _b === void 0 ? 'mmcif' : _b, _c = _a.isBinary, isBinary = _c === void 0 ? false : _c, _d = _a.assemblyId, assemblyId = _d === void 0 ? '' : _d;
        return __awaiter(this, void 0, void 0, function () {
            var data, trajectory;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.plugin.clear()];
                    case 1:
                        _e.sent();
                        return [4 /*yield*/, this.plugin.builders.data.download({ url: assets_1.Asset.Url(url), isBinary: isBinary }, { state: { isGhost: true } })];
                    case 2:
                        data = _e.sent();
                        return [4 /*yield*/, this.plugin.builders.structure.parseTrajectory(data, format)];
                    case 3:
                        trajectory = _e.sent();
                        return [4 /*yield*/, this.plugin.builders.structure.hierarchy.applyPreset(trajectory, 'default', {
                                structure: assemblyId ? {
                                    name: 'assembly',
                                    params: { id: assemblyId }
                                } : {
                                    name: 'model',
                                    params: {}
                                },
                                showUnitcell: false,
                                representationPreset: 'auto'
                            })];
                    case 4:
                        _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BasicWrapper.prototype.setBackground = function (color) {
        commands_1.PluginCommands.Canvas3D.SetSettings(this.plugin, { settings: function (props) { props.renderer.backgroundColor = color_1.Color(color); } });
    };
    BasicWrapper.prototype.toggleSpin = function () {
        if (!this.plugin.canvas3d)
            return;
        commands_1.PluginCommands.Canvas3D.SetSettings(this.plugin, {
            settings: function (props) {
                props.trackball.spin = !props.trackball.spin;
            }
        });
        if (!this.plugin.canvas3d.props.trackball.spin)
            commands_1.PluginCommands.Camera.Reset(this.plugin, {});
    };
    return BasicWrapper;
}());
exports["default"] = BasicWrapper;
// (window as any).BasicMolStarWrapper = new BasicWrapper();
