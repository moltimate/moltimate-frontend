import searchTypes from '../actions/types';

const initialState = {
  filters: [],
  pdbs: [],
  files: {},
  calculations: [],
};

const search = (state = initialState, action) => {
  switch (action.type) {
  case searchTypes.UPDATE_PDBS:
    return Object.assign({}, state, {
      pdbs: action.payload
    });
  // If a filter is checked/unchecked
  case searchTypes.UPDATE_QUERY:
    return {
      ...state,
      [action.section]: state[action.section].indexOf(action.payload) === -1 ?
        [...state[action.section], action.payload] :
        state[action.section].filter(f => f !== action.payload)
    };
  case searchTypes.UPLOAD_FILE:
    return { ...state, files: action.payload};
  case searchTypes.QUERY_SUBMIT_REQUEST:
    return { ...state, status: 'pending'};
  case searchTypes.QUERY_SUBMIT_SUCCESS:
    return { ...state, status: 'success'};
  case searchTypes.QUERY_SUBMIT_ERROR:
    return { ...state, status: 'error'};
  case searchTypes.UPDATE_RESULTS: {
    return { ...state, results: action.payload};
  }
  default:
    return state;
  }
};

export default search;
