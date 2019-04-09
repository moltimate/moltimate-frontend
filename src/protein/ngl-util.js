import * as NGL from 'ngl';

export function init(base, compare) {
  // Setup to load data from rawgit
  NGL.DatasourceRegistry.add(
    'data', new NGL.StaticDatasource( '//cdn.rawgit.com/arose/ngl/v2.0.0-dev.32/data/' )
  );

  // Create NGL Stage object
  let stage = new NGL.Stage( 'viewport' , {backgroundColor: 'white'});
  stage.mouseControls.remove( 'drag-ctrl-right' );
  stage.mouseControls.remove( 'drag-ctrl-left' );
  // Handle window resizing
  window.addEventListener( 'resize', function( event ){
    stage.handleResize();
  }, false );

  let select1 = '';
  let select2 = '';

  // Build the query with residue and chain pairs
  compare.alignedResidues.forEach((r) => { select1 = select1.concat(`${r.residueId}:${r.residueChainName} or `);});
  compare.activeSiteResidues.forEach((r) => { select2 = select2.concat(`${r.residueId}:${r.residueChainName} or `);});

  Promise.all([
    stage.loadFile(`rcsb://${base}`).then((o) => {
      o.addRepresentation('ball+stick', { sele: select1, color: '#2AF598'});
      o.autoView();
      return o;
    }),

    stage.loadFile(`rcsb://${compare.motifPdbId}`).then((o) => {
      o.addRepresentation('ball+stick', { sele: select2, color: '#20BDFF' });
      o.autoView();
      return o;
    })
  ]).then((ol) => {
    var s1 = ol[ 0 ].structure;
    var s2 = ol[ 1 ].structure;
    NGL.superpose(s1, s2, false, select1, select2);
    ol[ 0 ].updateRepresentations({ position: true });
    ol[ 0 ].autoView();
  });
}
