const library_ligands = [
  {name:"00I",structure:"C30 H35 N5 O6 S", selected:false, min_affinity: -5.2},
  {name:"00K",structure:"C28 H44 N6 O4", selected:false, min_affinity: -6.1},
  {name:"00L",structure:"C30 H42 N8 O4", selected:false, min_affinity: -3.2},
  {name:"00N",structure:"C24 H34 N8 O3 S", selected:false, min_affinity: -4.4},
  {name:"00P",structure:"C22 H29 N5 O5 S", selected:false, min_affinity: -9.8},
  {name:"00Q",structure:"C27 H35 N7 O3 S", selected:false, min_affinity: -7.5},
  {name:"00R",structure:"C24 H29 N7 O5 S", selected:false, min_affinity: -4.5},
  {name:"02P",structure:"C21 H26 C1 N4 O2", selected:false, min_affinity: -3.1},];

const test_ligands = [
  {name:"ligand1",structure:"C20 H28 N2 O", selected:true, min_affinity: -4.6},
  {name:"ligand2A",structure:"C20 H22 N10 O2 S", selected:false, min_affinity: -8.3}];

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