import React from 'react';
import litemol from 'litemol';

class ProteinContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="liteMol"></div>
    )
  }

  componentDidMount() {
    let plugin = litemol.Plugin.create({
        target: '#liteMol',
        viewportBackground: '#fff',
        layoutState: {
            hideControls: true,
        },
        allowAnalytics: true
    });
    plugin.loadMolecule({
      id: '1tqn',
      format: 'pdb',
      url: 'https://www.ebi.ac.uk/pdbe/entry-files/download/pdb1tqn.ent'
    }).then(() => {
        console.log('Molecule loaded');
    }).catch(e => {
        console.error(e);
    });
  }
}

export default ProteinContainer;
