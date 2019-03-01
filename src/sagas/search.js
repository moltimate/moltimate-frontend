import { put, takeLatest, call, all, spawn, select } from 'redux-saga/effects';
import searchTypes from '../actions/types';
import axios from 'axios';

export const getQuery = (state) => state.search;

const searchURL = 'http://localhost:8080/align/activesite';

function postRequest( url, payload) {
  return axios.post(url, payload)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
    });;
}

function buildFormData(formData, data, parentKey) {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach(key => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
    });
  } else {
    const value = data == null ? '' : data;
    formData.append(parentKey, value);
  }
}

function jsonToFormData(data) {
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
}

const tempBody = {
  pdbIds: ['8gch', '1ezi', '1ma0'],
  ecNumber: '3.4.21',
  options: [],
  filters: []
};

function* submitSearch() {
  let payload = jsonToFormData(yield select(getQuery));
  let response;
  console.log(payload);
  try {
    response = yield call(postRequest, searchURL, payload);
    response = response.data.alignments;
    yield put({ type: searchTypes.QUERY_SUBMIT_SUCCESS});
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
