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
    stage.loadFile(`rcsb://${base}`).then(function (o) {
      var query = compare.alignedResidues.map(i => i.residueId +":"+i.chainName).join(" or ");
      o.addRepresentation('ball+stick', { sele: query, color: 'lightgreen'});
      o.autoView();
      return o;
    }),

    stage.loadFile(`rcsb://${compare.motifPdbId}`).then(function (o) {
      var query = compare.activeSiteResidues.map(i => i.residueId +":"+i.chainName).join(" or ");
      o.addRepresentation('ball+stick', { sele: query, color: 'tomato' });
      o.autoView();
      return o;
    })
  ]).then(function (ol) {
    var s1 = ol[ 0 ].structure;
    var s2 = ol[ 1 ].structure;
    var q1 = compare.alignedResidues.map(i => i.residueId +":"+i.chainName).join(" or ");
    var q2 = compare.activeSiteResidue.map(i => i.residueId +":"+i.chainName).join(" or ");
    NGL.superpose(s1, s2, true, q1, q2);
    ol[ 0 ].updateRepresentations({ position: true });
    ol[ 0 ].autoView();
  });
}
