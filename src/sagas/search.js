import { put, takeLatest, all, spawn } from 'redux-saga/effects';
import searchTypes from '../actions/types';

function* submitSearch() {
  console.log('potat');
  const json = yield fetch('http://localhost:8080/debug')
    .then(response => response.json());
  yield put({ type: searchTypes.SUBMIT_QUERY, json: json.query, });
}

function* actionWatcher() {
  yield takeLatest(searchTypes.SUBMIT_QUERY, submitSearch);
}

export default function* search() {
  yield all([
    spawn(actionWatcher),
  ]);
}
