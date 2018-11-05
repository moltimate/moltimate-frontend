import searchTypes from '../actions/types';

const initialState = {
  name: null,
  ecNumber: null,
  rmsd: null,
  setFilters: {
    userMotif: null,
    pSet: null,
    aSet: null,
    metalAmino: null,
    metalOther: null,
  },
};

const search = (state = initialState, action) => {
  switch (action.type) {
  case searchTypes.UPDATE_QUERY:
    return Object.Assign(state, action.payload);
  case searchTypes.SUBMIT_QUERY:
    return { ...state, results: action.results};
  default:
    return state;
  }
};

export default search;
