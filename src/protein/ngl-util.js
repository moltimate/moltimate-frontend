import * as NGL from 'ngl';

let stage;
let docking_stage;
let _file;
let _model;
let _parentId;
let _childId;

export function init(parentId, childId, aligned, active) {
  // Setup to load data from rawgit
  NGL.DatasourceRegistry.add(
    'data', new NGL.StaticDatasource( '//cdn.rawgit.com/arose/ngl/v2.0.0-dev.32/data/' )
  );

  // Create NGL Stage object
  if (parentId != _parentId || childId != _childId) {
    stage = new NGL.Stage( 'viewport' , {backgroundColor: 'white'});
  }
  _parentId = parentId;
  _childId = childId;
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
      o.addRepresentation('ball+stick', { sele: select1, color: '#2AF598'});
      o.autoView();
      return o;
    }),

    stage.loadFile(`rcsb://${childId}`).then((o) => {
      o.addRepresentation('ball+stick', { sele: select2, color: '#20BDFF' });
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

/**
 * Loads a docked pdb file. File should include protein as the first model, and all ligand orientations after.
 *
 * @param file - pdb file to load.
 * @param model - Number of ligand model within pdb file. This should be 1 indexed, as model 0 is the protein.
 * @param active_sites - List of active sites in the selected protein.
 */
export function loadDocked(file, model, active_sites) {
    NGL.DatasourceRegistry.add(
        'data', new NGL.StaticDatasource( '//cdn.rawgit.com/arose/ngl/v2.0.0-dev.32/data/' )
    );

    // Create NGL Stage object
    if (file.name != _file || model != _model) {
        docking_stage = new NGL.Stage( 'viewport' , { backgroundColor: 'white' });
    }
    _file = file.name;
    _model = model;
    docking_stage.mouseControls.remove( 'drag-ctrl-right' );
    docking_stage.mouseControls.remove( 'drag-ctrl-left' );
    // Handle window resizing
    window.addEventListener( 'resize', function( event ){
        stage.handleResize();
    }, false );

    let select1 = '';
    let select2 = '/0';

    // Create a select query for the active sites and one for everything except the active sites.
    active_sites.forEach((r) => {
        select1 = select1.concat(
            `${r.residueId}:${r.residueChainName}${r.residueAltLoc != "" ? `%${r.residueAltLoc}`: ''}/0 or `
        );
        select2 = select2.concat(
            ` and not ${r.residueId}:${r.residueChainName}${r.residueAltLoc != "" ? `%${r.residueAltLoc}`: ''}/0`
        );
    });

    select1 = select1.substring(0, select1.length - 4);

    // Load file
    docking_stage.loadFile(file, {ext:"pdb"}).then((o) => {
        // Load ligand, grab only the selected orientation
        o.addRepresentation('ball+stick', { sele: `/${model}` });

        // Load Protein

        // Load active sites as a ball+stick format
        o.addRepresentation('ball+stick', { color: '#2AF598', sele: select1 });
        // Load rest of protein as cartoon
        o.addRepresentation('cartoon', { color: '#20BDFF', sele: select2 });

        // Center camera
        o.autoView();
    });
}
