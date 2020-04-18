function uniqueID(){
  return this.name.toString() + this.macromolecule.toString();
}

const library_ligands = {
  "00I": {name:"00I",structure:"C30 H35 N5 O6 S", selected:false, min_affinity: -5.2, macromolecule: false, 
    uniqueID: uniqueID},
  "00K": {name:"00K",structure:"C28 H44 N6 O4", selected:false, min_affinity: -6.1, macromolecule: false, 
    uniqueID: uniqueID},
  "00L": {name:"00L",structure:"C30 H42 N8 O4", selected:false, min_affinity: -3.2, macromolecule: false, 
    uniqueID: uniqueID},
  "00N": {name:"00N",structure:"C24 H34 N8 O3 S", selected:false, min_affinity: -4.4, macromolecule: false, 
    uniqueID: uniqueID},
  "00P": {name:"00P",structure:"C22 H29 N5 O5 S", selected:false, min_affinity: -9.8, macromolecule: false, 
    uniqueID: uniqueID},
  "00Q": {name:"00Q",structure:"C27 H35 N7 O3 S", selected:false, min_affinity: -7.5, macromolecule: false, 
    uniqueID: uniqueID},
  "00R": {name:"00R",structure:"C24 H29 N7 O5 S", selected:false, min_affinity: -4.5, macromolecule: false, 
    uniqueID: uniqueID},
  "02P": {name:"02P",structure:"C21 H26 C1 N4 O2", selected:false, min_affinity: -3.1, macromolecule: false, 
    uniqueID: uniqueID},
};

const test_ligands = {};

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

const test_sites = [
  {
      residueId: 57,
      residueChainName: "A",
      residueAltLoc: ""
  },
  {
      residueId: 57,
      residueChainName: "B",
      residueAltLoc: ""
  },
  {
      residueId: 57,
      residueChainName: "C",
      residueAltLoc: ""
  },
  {
      residueId: 57,
      residueChainName: "D",
      residueAltLoc: ""
  },
  {
      residueId: 102,
      residueChainName: "A",
      residueAltLoc: ""
  },
  {
      residueId: 102,
      residueChainName: "B",
      residueAltLoc: ""
  },
  {
      residueId: 102,
      residueChainName: "C",
      residueAltLoc: ""
  },
  {
      residueId: 102,
      residueChainName: "D",
      residueAltLoc: ""
  },
  {
      residueId: 195,
      residueChainName: "A",
      residueAltLoc: ""
  },
  {
      residueId: 195,
      residueChainName: "B",
      residueAltLoc: ""
  },
  {
      residueId: 195,
      residueChainName: "C",
      residueAltLoc: ""
  },
  {
      residueId: 195,
      residueChainName: "D",
      residueAltLoc: ""
  }
]

module.exports = {
  library_ligands: library_ligands,
  test_ligands: test_ligands,
  fake_docking_data: fake_docking_data,
  fake_docking_data_2: fake_docking_data_2,
  test_sites: test_sites

};