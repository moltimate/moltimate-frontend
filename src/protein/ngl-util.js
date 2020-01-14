import * as NGL from 'ngl';

export function init(parentId, childId, aligned, active, display_mode) {
  // Setup to load data from rawgit
  NGL.DatasourceRegistry.add(
    'data', new NGL.StaticDatasource( '//cdn.rawgit.com/arose/ngl/v2.0.0-dev.32/data/' )
  );

  let surfaceRep = display_mode.split("-")[1];
  display_mode = display_mode.split("-")[0];

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

  // Build the query with residue and chain pair
  aligned.forEach((r) => {
    select1 = select1.concat(
      `${r.residueId}:${r.residueChainName}${r.residueAltLoc != "" ? `%${r.residueAltLoc}`: ''}/0 or `
    );
  });

  active.forEach((r) => {
    select2 = select2.concat(
      `${r.residueId}:${r.residueChainName}${r.residueAltLoc != "" ? `%${r.residueAltLoc}`: ''}/0 or `
    );
  });

  select1.substring(0, select1.length - 4);

  Promise.all([
    stage.loadFile(`rcsb://${parentId}`).then((o) => {
      o.addRepresentation(display_mode, { sele: select1, color: '#2AF598', surfaceType: surfaceRep});
      o.autoView();
      return o;
    }),

    stage.loadFile(`rcsb://${childId}`).then((o) => {
      o.addRepresentation(display_mode, { sele: select2, color: '#20BDFF', surfaceType: surfaceRep});
      o.autoView();
      return o;
    })
  ]).then((ol) => {
    var s1 = ol[ 0 ].structure;
    var s2 = ol[ 1 ].structure;
    NGL.superpose(s1, s2, true, select1, select2);
    ol[ 0 ].updateRepresentations({ position: true });
    ol[ 1 ].autoView();
  });
}
