import React, { useState, useEffect } from 'react';
import BasicWrapper from './ts/BasicWrapper';
import './MolStar.css';

function MolStar(props) {
    // parentId: The searched protein
    // childId: The selected protein
    // aligned: The active sites to align
    const { parentId, childId, aligned } = props;

    const [basicWrapper] = useState(new BasicWrapper());

    useEffect(() => {
        basicWrapper.init(document.getElementById('molstar-viewer'));
    }, []);

    useEffect(() => {
        // basicWrapper.load({ pdbIds: [parentId, childId] }); // Load the two selected protein structures
        basicWrapper.dynamicSuperposition([parentId, childId], aligned); // Load only the active sites of the two protein structures
    }, [childId]);

    return (
        <div id="molstar-viewer"></div>
    )
}

export default MolStar;