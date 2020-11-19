import React, { useState, useEffect } from 'react';
import BasicWrapper from './ts/BasicWrapper';
import styles from '../styles.js';

function MolStar(props) {
    const { searchQuery, basicWrapper } = props;
    const [pdbId, setPdbId] = useState(searchQuery || '1grm');
    const [url, setUrl] = useState('https://files.rcsb.org/download/' + pdbId + '.cif');
    const [format, setFormat] = useState('mmcif');
    
    useEffect(() => {
        basicWrapper.init(document.getElementById('molstar-viewer'))
    });

    return (
        <div>
            {/* <div>
                <h3>Source</h3>
                <input type='text' id='pdb-id' placeholder='pdb id' />
                <select id='format'>
                    <option value='mmcif' defaultValue>mmCIF</option>
                    <option value='pdb'>PDB</option>
                </select>
                <button onClick={() => basicWrapper.load({ url: url, format: format })}>Load Asym Unit</button>
            </div> */}
            <div id="molstar-viewer"></div>
        </div>
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