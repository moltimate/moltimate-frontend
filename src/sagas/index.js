import { spawn, all } from 'redux-saga/effects';
import search from './search';

function* rootSaga() {
  yield all([
    spawn(search)
  ]);
}

export default rootSaga;
