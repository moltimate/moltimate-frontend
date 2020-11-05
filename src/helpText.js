export default {
    searchText: {
      searchBoxModalText: {
        modalTitle: "Search Box Description",
        modalBody: "The search box is used for querying proteins against the " +
        "PDB and returning a list of proteins with similar active sites." +
        "</br></br>" +
        "To begin the process the user must enter a protein, by either: " +
        "<ul><li>Entering the PDB id of the protein in the PDB search bar and hitting the “Return” key.</li>" +
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
      "Default: none.\nFilter the motifs to only those found in " +
      "certain EC Class. There are a few motifs with an unknown EC Class " +
      "and they will always be included in the results.",
      precisionText:
      "Default: 1.\nRequirements: Must be positive. \n" +
      "Increasing the precision factor increases the acceptable " +
      "distance between a set of atoms when doing an alignment,effectively " +
      "loosening the restrictions for a positive alignment. Increase the " +
      "precision to expand the number of positive hits, or decrease it to " +
      "reduce the number of positive hits",
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
      "Maker is used for creating custom enzyme active site motifs " +
      "for comparison with query structures."
    },
    motifStructure: "If the protein you are using is available in the RCSB's " +
    "database we can obtain the structure directly from them. Otherwise, " +
    "you will need to provide the structure by selecting \"Custom\" " +
    "and uploading the correct PDB or MMCIF file.",
    customStructure: "Supports PDB and MMCIF.\n Include custom structures " +
    "in your test. These are tested alongside any of the test options " +
    "selected. The PDB id will be parsed from the structure file and will " +
    "be identified when returned.",
    ecClassText: "This is used for finding the protein's homologs. " +
    "If it is not known, please leave blank and we will set it to 'unknown' " +
    "in the created motif,  and compare your query to the full set of motifs " +
    "found in Moltimate. Without an EC class, we will not be able to run a homolog test, " +
    "however, you can still compare the custom active site to a custom list using the List test " +
    "option and inputting PDB ids.",
    pdbIdText: "Enter the PDB ID of the protein you would like to create.",
    activeSites: "List the residues in the active site, with a minimum of three " +
    "residues.\nIf there are alternate positions available in the structure for " +
    "a residue in the active site, please do not indicate an option. " +
    "At the time of alignment, Moltimate will identify the alternative positions " +
    "and compare them with the structure to find the best alignment",
    selfTest: "Test the above motif against its own structure. (self vs. self). " +
    "If it does not find an alignment, there is likely a typo in the entered residues. " +
    "This answers the question - is this a functional active site motif?",
    homologTest: "Test the above motif against all proteins from the same EC Class, as defined by the PDB. " +
    "This analysis provides a list of “true positives” for active site alignments. Any PDB structures " +
    "from the same EC class that are not found by Moltimate are then “false negatives”.",
    randomTest: "Test the above motif against a number of randomly selected proteins from the PDB. " +
    "Except for the case where a homolog is chosen randomly, this option is designed to test for “false positives.”"
    listTest: "Test the above motif against a list of proteins available on the PDB"
  },
  ligandText: {
    ligandLibraryModalText: {
      modalTitle: "Ligand Library Description",
      modalBody: "Ligands for the EC class of the protein selected for alignment " +
      "will appear here. A ligand may be selected and docked with the aligned protein."
    },
    importedLigandsModalText: {
      modalTitle: "Import Ligand Description",
      modalBody: "Upload custom ligands to be used for docking."
    },
    ligandFilterText: "Filter the ligand list by ligand name",
    dockButtonText: "Dock the selected ligand with the protein that is currently aligned.",
    ligandUploadButtonText: "Upload a ligand in one of the following formats:\n SDF."
  }
}
