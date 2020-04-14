import * as NGL from 'ngl';

let stage;
let docking_stage;
let _file;
let _model;
let _protein_display_mode;
let _active_sites_display_mode;
let _ligand_display_mode;
let _parentId;
let _childId;
let _query_display_mode;
let _motif_display_mode;

export function init(parentId, childId, aligned, active, query_display_mode, motif_display_mode) {
  // Setup to load data from rawgit
  NGL.DatasourceRegistry.add(
    'data', new NGL.StaticDatasource( '//cdn.rawgit.com/arose/ngl/v2.0.0-dev.32/data/' )
  );

  // Only load if something changed to prevent the model from reloading every time the settings are opened.
  if( _parentId == parentId && _childId == childId && _query_display_mode == query_display_mode && _motif_display_mode == motif_display_mode ) {
    return;
  }

  _query_display_mode = query_display_mode;
  _motif_display_mode = motif_display_mode;

  let query_surface_rep = query_display_mode.split("-")[1];
  query_display_mode = query_display_mode.split("-")[0];
  let motif_surface_rep = motif_display_mode.split("-")[1];
  motif_display_mode = motif_display_mode.split("-")[0];

  // Create NGL Stage object
  if (parentId != _parentId || childId != _childId) {
    stage = new NGL.Stage( 'viewport' , {backgroundColor: 'white'});
  }
  _parentId = parentId;
  _childId = childId;
  stage.mouseControls.remove( 'drag-ctrl-right' );
  stage.mouseControls.remove( 'drag-ctrl-left' );
  stage.removeAllComponents();
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
      o.addRepresentation(query_display_mode, { sele: select1, color: '#2AF598', surfaceType: query_surface_rep });
      o.autoView();
      return o;
    }),

    stage.loadFile(`rcsb://${childId}`).then((o) => {
      o.addRepresentation(motif_display_mode, { sele: select2, color: '#20BDFF', surfaceType: motif_surface_rep });
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
export function loadDocked(file, model, active_sites, protein_display_mode, active_sites_display_mode, ligand_display_mode) {
    NGL.DatasourceRegistry.add(
        'data', new NGL.StaticDatasource( '//cdn.rawgit.com/arose/ngl/v2.0.0-dev.32/data/' )
    );

    // Only load if something changed to prevent the model from reloading every time the settings are opened.
    if( _file == file.name && _model == model && _protein_display_mode == protein_display_mode
        && _active_sites_display_mode == active_sites_display_mode && _ligand_display_mode == ligand_display_mode ) {
        return;
    }

    _protein_display_mode = protein_display_mode;
    _active_sites_display_mode = active_sites_display_mode;
    _ligand_display_mode = ligand_display_mode;

    let protein_surface_rep = protein_display_mode.split("-")[1];
    protein_display_mode = protein_display_mode.split("-")[0];
    let active_sites_surface_rep = active_sites_display_mode.split("-")[1];
    active_sites_display_mode = active_sites_display_mode.split("-")[0];
    let ligand_surface_rep = ligand_display_mode.split("-")[1];
    ligand_display_mode = ligand_display_mode.split("-")[0];

    // Create NGL Stage object
    if (file.name != _file || model != _model) {
        docking_stage = new NGL.Stage( 'viewport' , { backgroundColor: 'white' });
    }
    _file = file.name;
    _model = model;
    docking_stage.mouseControls.remove( 'drag-ctrl-right' );
    docking_stage.mouseControls.remove( 'drag-ctrl-left' );
    docking_stage.removeAllComponents();
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
        o.addRepresentation(ligand_display_mode, { sele: `/${model}`, surfaceType: ligand_surface_rep });

        // Load Protein

        // Load active sites
        o.addRepresentation(active_sites_display_mode, { color: '#2AF598', sele: select1, surfaceType: active_sites_surface_rep });
        // Load rest of protein
        o.addRepresentation(protein_display_mode, { color: '#20BDFF', sele: select2, surfaceType: protein_surface_rep });

        // Center camera
        o.autoView();
    });
}
