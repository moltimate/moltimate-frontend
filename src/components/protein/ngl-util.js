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
    var alt = compare.alignedResidues[i].residueAltLoc;
    if(alt != ""){
      alt = "%"+ alt;
    }
     a1.push(compare.alignedResidues[i].residueId +":"+compare.alignedResidues[i].residueChainName+ alt + "/0");
  }
  for( var i = 0; i < compare.activeSiteResidues.length; i++ ){
    var alt = compare.activeSiteResidues[i].residueAltLoc;
    if(alt != ""){
      alt = "%"+ alt;
    }
     a2.push(compare.activeSiteResidues[i].residueId +":"+compare.activeSiteResidues[i].residueChainName+ alt + "/0");
  }
  var q1 = a1.join(" or ");
  var q2 = a2.join(" or ");

  Promise.all([
    stage.loadFile(`rcsb://${base}`).then(function (o) {
      o.addRepresentation('ball+stick', { sele: q1, color: '#2AF598'});
      o.autoView();
      return o;
    }),

    stage.loadFile(`rcsb://${compare.motifPdbId}`).then(function (o) {
      o.addRepresentation('ball+stick', { sele: q2, color: '#20BDFF' });
      o.autoView();
      return o;
    })
  ]).then(function (ol) {
    var s1 = ol[ 0 ].structure;
    var s2 = ol[ 1 ].structure;
    NGL.superpose(s1, s2, true, q1, q2);
    ol[ 0 ].updateRepresentations({ position: true });
    ol[ 0 ].autoView();
  });
}
