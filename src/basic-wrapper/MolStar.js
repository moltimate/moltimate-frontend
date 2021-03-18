import React, { useState, useEffect } from 'react';
import BasicWrapper from './ts/BasicWrapper';
import './MolStar.css';

function MolStar(props) {
    const { parentId, childId, aligned, active, queryProteinMode, motifProteinMode } = props;

    const [basicWrapper] = useState(new BasicWrapper());

    useEffect(() => {
        basicWrapper.init(document.getElementById('molstar-viewer'));
    }, []);

    useEffect(() => {
        basicWrapper.load({ pdbIds: [parentId, childId] });
    });

    return (
        <div id="molstar-viewer"></div>
    )

    // function $(id) { return document.getElementById(id); }

    // var pdbId = '1grm', assemblyId= '1';
    // var url = 'https://files.rcsb.org/download/' + pdbId + '.cif';
    // var format = 'mmcif';

    // $('pdb-id').value = pdbId;
    // $('pdb-id').onchange = function (e) { 
    //     pdbId = e.target.value;
    //     url = 'https://files.rcsb.org/download/' + pdbId + '.cif';
    // }

    // $('format').value = format;
    // $('format').onchange = function (e) { format = e.target.value; }

    // BasicMolStarWrapper.init('molstar-viewer'); //////
    // BasicMolStarWrapper.setBackground(0xffffff);

    // addControl('Load Asym Unit', () => BasicMolStarWrapper.load({ url: url, format: format }));

    // function addControl(label, action) {
    //     var btn = document.createElement('button');
    //     btn.onclick = action;
    //     btn.innerText = label;
    //     $('controls').appendChild(btn);
    // }
}

export default MolStar;