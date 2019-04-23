import * as NGL from 'ngl';

export function init(protein, options) {
  // Setup to load data from rawgit
  NGL.DatasourceRegistry.add(
    'data', new NGL.StaticDatasource( '//cdn.rawgit.com/arose/ngl/v2.0.0-dev.32/data/' )
  );

  // Create NGL Stage object
  let stage = new NGL.Stage( 'viewport' , {backgroundColor: options.background});
  stage.mouseControls.remove( 'drag-ctrl-right' );
  stage.mouseControls.remove( 'drag-ctrl-left' );
  // Handle window resizing
  window.addEventListener( 'resize', function( event ){
    stage.handleResize();
  }, false );

  let select1 = '';
  let select2 = '';

  // Build the query with residue and chain pair
  protein.aligned.forEach((r) => {
    select1 = select1.concat(
      `${r.residueId}:${r.residueChainName}${r.residueAltLoc != "" ? `%${r.residueAltLoc}`: ''}/0 or `
    );
  });

  protein.active.forEach((r) => {
    select2 = select2.concat(
      `${r.residueId}:${r.residueChainName}${r.residueAltLoc != "" ? `%${r.residueAltLoc}`: ''}/0 or `
    );
  });

  select1.substring(0, select1.length - 4);

  console.log(protein.parentId);
  console.log(select1);

  console.log(protein.childId);
  console.log(select2);

  Promise.all([
    stage.loadFile(`rcsb://${protein.parentId}`).then((o) => {
      o.addRepresentation('ball+stick', { sele: select1, color: options.color1});
      o.autoView();
      return o;
    }),

    stage.loadFile(`rcsb://${protein.childId}`).then((o) => {
      o.addRepresentation('ball+stick', { sele: select2, color: options.color2 });
      o.autoView();
      return o;
    })
  ]).then((ol) => {
    var s1 = ol[ 0 ].structure;
    var s2 = ol[ 1 ].structure;
    NGL.superpose(s1, s2, true, select1, select2);
    ol[ 0 ].updateRepresentations({ position: true });
    ol[ 0 ].autoView(select1);
    o.addRepresentation("distance", {
      atomPair: atomPair,
      labelColor: "skyblue",
      color: "skyblue"
    })
  });
}
