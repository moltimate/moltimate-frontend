export default {
    searchText: {
      searchBoxModalText: {
      modalTitle: "Search Box Hints",
      modalBody:
      "The search box is used for querying proteins against the PDB and " +
      "returning a list of similar proteins and their alignments.\n" +
      "To begin the process the user must enter a protein, by either " +
      "entering the PDB id of the protein in the PDB seach bar or by " +
      "uploading a custom structure through the custom upload tool.\n" +
      "Next the user has the option to refine their search to specifc EC " +
      "classes and within a certain percision.\n Finally press the search" +
      "button and the resulting protein list will appear in the search results box."
    },
    ecClassText:
    "Default: none.\n Filter the motifs to only those with a " +
    "certain EC Class.There are a few motifs with an unknown EC Class " +
    "and they will always be included in the results.",
    precisionText:
    "Default: 1. Requirements: Must be positive. \n" +
    "Increasing the precision factor increases the acceptable " +
    "distance between a set of atoms when doing an alignment.",
    pdbIdText: "Enter the PDB id of the protein you would like to query.",
    customBottonText:
    "Supports PDB or MMCIF files.\n Upload a custom structure " +
    "to be included in the alignment. The PDB id will be parsed out of the " +
    "structure to be included in the response. A custom structure will be " +
    "listed with any motifs that are able to be matched to it."
  }
  }
