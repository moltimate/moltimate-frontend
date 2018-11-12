import searchTypes from './types';

export function updateQuery(section, payload) {
  return {
    type: searchTypes.UPDATE_QUERY,
    section,
    payload
  };
}

export function updatePDBS(payload) {
  return {
    type: searchTypes.UPDATE_PDBS,
    payload
  };
}

export function uploadFile(payload) {
  return {
    type: searchTypes.UPLOAD_FILE,
    payload
  };
}

export function submitQuery(payload) {
  return {
    type: searchTypes.QUERY_SUBMIT_REQUEST,
    payload,
  };
}
