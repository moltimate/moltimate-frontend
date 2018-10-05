const axios = require('axios');

const testingUrl = `http://localhost:8000/`;

export function getWithFetch(path, body) {
  axios.post(testingUrl + path, body);
};

export function get(path) {
  axios.get(testingUrl + path)
};
