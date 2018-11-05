import searchTypes from './types';

export function updateQuery(payload) {
  return {
    type: searchTypes.UPDATE_QUERY,
    payload
  };
}

export function submitQuery(payload) {
  console.log('*************************');
  return {
    type: searchTypes.SUBMIT_QUERY,
    payload,
  };
}
