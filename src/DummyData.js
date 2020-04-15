const library_ligands = [
  {name:"00I",structure:"C30 H35 N5 O6 S", selected:false, min_affinity: -5.2, macromolecule: false},
  {name:"00K",structure:"C28 H44 N6 O4", selected:false, min_affinity: -6.1, macromolecule: false},
  {name:"00L",structure:"C30 H42 N8 O4", selected:false, min_affinity: -3.2, macromolecule: false},
  {name:"00N",structure:"C24 H34 N8 O3 S", selected:false, min_affinity: -4.4, macromolecule: false},
  {name:"00P",structure:"C22 H29 N5 O5 S", selected:false, min_affinity: -9.8, macromolecule: false},
  {name:"00Q",structure:"C27 H35 N7 O3 S", selected:false, min_affinity: -7.5, macromolecule: false},
  {name:"00R",structure:"C24 H29 N7 O5 S", selected:false, min_affinity: -4.5, macromolecule: false},
  {name:"02P",structure:"C21 H26 C1 N4 O2", selected:false, min_affinity: -3.1, macromolecule: false},];

const test_ligands = [];

const fake_docking_data = (
  [[1,-9.8,0],
  [2,-9.8,2.232],
  [3,-9.6, 2.159],
  [4,-7.3, 2.116],
  [5,-7.2, 2.126],
  [6,-7.2, 2.348],
  [7,-7.1, 22.363],
  [8,-6.8, 29.022],
  [9,-6.6, 21.567]]);
  
const fake_docking_data_2 = (
  [[1, -3, 1],[2, -2, 5],[3, -1, 10]]
);

module.exports = {
  library_ligands: library_ligands,
  test_ligands: test_ligands,
  fake_docking_data: fake_docking_data,
  fake_docking_data_2: fake_docking_data_2

};