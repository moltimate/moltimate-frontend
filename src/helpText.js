export default {
    searchText: {
      searchBoxModalText: {
        modalTitle: "Search Box Description",
        modalBody: "The search box is used for querying proteins against the " +
        "PDB and returning a list of proteins with similar active sites." +
        "</br></br>" +
        "To begin the process the user must enter a protein, by either: " +
        "<ul><li>Entering the PDB id of the protein in the PDB search bar.</li>" +
        "<li>Uploading a custom structure through the custom upload tool.</li></ul> " +
        "The search may be refined to specific EC classes or precisions using the " +
        "EC class and precision fields."+
        "</br>Finally press the " +
        "search button and the resulting protein list will appear in the search results box."
      },
      searchResultsModalText: {
        modalTitle: "Search Results Description",
        modalBody: "A list of proteins with similar active sites to the queried protein."
      },
      resultFilterText: "Filter the protein list be either RMSD value or EC class." +
      "\nBoth options will be shown in ascending order.",
      ecClassText:
      "Default: none.\nFilter the motifs to only those with a " +
      "certain EC Class. There are a few motifs with an unknown EC Class " +
      "and they will always be included in the results.",
      precisionText:
      "Default: 1.\nRequirements: Must be positive. \n" +
      "Increasing the precision factor increases the acceptable " +
      "distance between a set of atoms when doing an alignment.",
      pdbIdText: "Enter the PDB id of the protein you would like to query.",
      customBottonText:
      "Supports PDB or MMCIF files.\n Upload a custom structure " +
      "to be included in the alignment. The PDB id will be parsed out of the " +
      "structure to be included in the response. A custom structure will be " +
      "listed with any motifs that are able to be matched to it."
  },
  makerText: {
    makerModalText: {
      modalTitle: "Maker Description",
      modalBody:
      "Maker is used for creating proteins with custom active sites to use " +
      "for querying."
    },
    motifStructure: "If the protein you are using is available in the RCSB's " +
    "database we can obtain the structure directly from them. Otherwise, " +
    "we will need you to provide the structure by selecting \"Custom\" " +
    "and uploading the correct PDB or MMCIF file.",
    customStructure: "Supports PDB and MMCIF.\n Include custom structures " +
    "in your test. These are tested alongside any of the test options " +
    "selected. The PDB id will be parsed from the structure file and will " +
    "be the identifier when returned.",
    ecClassText: "This is used for finding the protein's homologs. " +
    "If it is not known, please leave blank and we will set it to 'unknown' " +
    "in the created motif, we will not be able to run a homolog test, " +
    "however, you can still compare to a custom list using the List test " +
    "option and inputting PDB ids.",
    pdbIdText: "Enter the PDB id of the protein you would like to create.",
    activeSites: "List the residues in the active site, minimum three.\nIf there are alternate positions available in the structure for a residue in the active site, please do not indicate an option. At the time of alignment, we will identify the alternative positions and compare them with the structure to find the best alignment",
    selfTest: "Test the above motif against its own structure. " +
    "If it does not find an alignment, there is likely a typo in the entered residues.",
    homologTest: "Test the above motif against all proteins with the same EC Class, as defined by the PDB.",
    randomTest: "Test the above motif against a number of randomly selected proteins from the PDB.",
    listTest: "Test the above motif against a list of proteins available on the PDB"
  },
  ligandText: {
    ligandLibraryModalText: {
      modalTitle: "Ligand Library Description",
      modalBody: "Ligands for the EC class of the protein selected for alignment " +
      "will appear here. A ligand may be selected and docked with the aligned protein"
    },
    importedLigandsModalText: {
      modalTitle: "Import Ligand Description",
      modalBody: "Upload custom ligands to be used for docking."
    },
    ligandFilterText: "Filter the ligand list by ligand name",
    dockButtonText: "Dock the selected ligand with the protein that is currently aligned.",
    ligandUploadButtonText: "Upload a ligand."
  }
}
