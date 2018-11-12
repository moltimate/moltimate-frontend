import { put, takeLatest, call, all, spawn, select } from 'redux-saga/effects';
import searchTypes from '../actions/types';
import axios from 'axios';

export const getQuery = (state) => state;

function postRequest( url, payload) {
  return axios({ method: 'post', url, payload });
}

function* submitSearch() {
  let payload = yield select(getQuery);
  try {
    const response = yield call(postRequest('http://localhost:3000/search', payload));
    yield put({ type: searchTypes.QUERY_SUBMIT_SUCCESS });
    yield put({ type: searchTypes.UPDATE_RESULTS, response});
  } catch (error) {
    yield put({ type: searchTypes.QUERY_SUBMIT_ERROR });
  }
}

function* searchWatcher() {
  yield takeLatest(searchTypes.QUERY_SUBMIT_REQUEST, submitSearch);
}

function* uploadFiles(action) {
  const response = yield call(fetch, 'http://localhost:3000/files', {
    method : 'POST',
    body : action.payload
  });
}

function* uploadWatcher() {
  yield takeLatest(searchTypes.UPLOAD_FILE, uploadFiles);
}


export default function* search() {
  yield all([
    spawn(searchWatcher),
  ]);
}
