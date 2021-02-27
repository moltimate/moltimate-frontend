"use strict";
/**
 * Copyright (c) 2019-2020 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */
exports.__esModule = true;
exports.StripedResidues = void 0;
var custom_element_property_1 = require("molstar/lib/mol-model-props/common/custom-element-property");
var color_1 = require("molstar/lib/mol-util/color");
exports.StripedResidues = custom_element_property_1.CustomElementProperty.create({
    label: 'Residue Stripes',
    name: 'basic-wrapper-residue-striping',
    getData: function (model) {
        var map = new Map();
        var residueIndex = model.atomicHierarchy.residueAtomSegments.index;
        for (var i = 0, _i = model.atomicHierarchy.atoms._rowCount; i < _i; i++) {
            map.set(i, residueIndex[i] % 2);
        }
        return { value: map };
    },
    coloring: {
        getColor: function (e) { return e === 0 ? color_1.Color(0xff0000) : color_1.Color(0x0000ff); },
        defaultColor: color_1.Color(0x777777)
    },
    getLabel: function (e) {
        return e === 0 ? 'Odd stripe' : 'Even stripe';
    }
});
