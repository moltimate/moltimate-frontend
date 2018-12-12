import * as NGL from 'ngl';

export function init(base, compare) {
  // Setup to load data from rawgit
  NGL.DatasourceRegistry.add(
    'data', new NGL.StaticDatasource( '//cdn.rawgit.com/arose/ngl/v2.0.0-dev.32/data/' )
  );

  // Create NGL Stage object
  var stage = new NGL.Stage( 'viewport' , {backgroundColor: 'white'});

  // Handle window resizing
  window.addEventListener( 'resize', function( event ){
    stage.handleResize();
  }, false );

  var a1 = [];
  var a2 = [];

  for( var i = 0; i < compare.alignedResidues.length; i++ ){
     a1.push(compare.alignedResidues[i].residueId +":"+compare.alignedResidues[i].chainName);
  }
  for( var i = 0; i < compare.activeSiteResidues.length; i++ ){
     a2.push(compare.activeSiteResidues[i].residueId +":"+compare.activeSiteResidues[i].chainName);
  }
  var q1 = a1.join(" or ");
  var q2 = a2.join(" or ");

  Promise.all([
    stage.loadFile(`rcsb://${base}`).then(function (o) {
      o.addRepresentation('ball+stick', { sele: q1, color: 'lightgreen'});
      o.autoView();
      return o;
    }),

    stage.loadFile(`rcsb://${compare.motifPdbId}`).then(function (o) {
      o.addRepresentation('ball+stick', { sele: q2, color: 'tomato' });
      o.autoView();
      return o;
    })
  ]).then(function (ol) {
    var s1 = ol[ 0 ].structure;
    var s2 = ol[ 1 ].structure;
    NGL.superpose(s1, s2, false, q1, q2);
    ol[ 0 ].updateRepresentations({ position: true });
    ol[ 0 ].autoView();
  });
}
