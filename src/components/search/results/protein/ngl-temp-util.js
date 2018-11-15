import * as NGL from 'ngl';

export function init(base, compare) {
  // Setup to load data from rawgit
  NGL.DatasourceRegistry.add(
    'data', new NGL.StaticDatasource( '//cdn.rawgit.com/arose/ngl/v2.0.0-dev.32/data/' )
  );

  // Create NGL Stage object
  var stage = new NGL.Stage( 'viewport', {backgroundColor: 'white'} );

  // Handle window resizing
  window.addEventListener( 'resize', function( event ){
    stage.handleResize();
  }, false );

  Promise.all([
    stage.loadFile(`rcsb://${base}.pdb`, {
      defaultAssembly: 'AU'
    }).then(function (o) {
      o.addRepresentation('cartoon', { color: 'lightgreen' });
      o.addRepresentation('ball+stick', { sele: 'hetero', color: 'lightgreen', colorScheme: 'bfactor' });
      o.autoView();
      return o;
    }),

    stage.loadFile(`rcsb://${compare.motifPdbId}.pdb`).then(function (o) {
      o.addRepresentation('cartoon', { color: 'tomato' });
      o.addRepresentation('ball+stick', { sele: 'hetero', color: 'tomato' });
      o.autoView();
      return o;
    })
  ]).then(function (ol) {
    var s1 = ol[ 0 ].structure;
    var s2 = ol[ 1 ].structure;
    NGL.superpose(s1, s2, true);
    ol[ 0 ].updateRepresentations({ position: true });
    ol[ 0 ].autoView();
  });
}
