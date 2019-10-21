const { promisify } = require('util');
const request = require('request');

module.exports = function fetchData(url, apiKey) {
  return promisify(request.get)(url, {
    headers: {
      'X-API-KEY': apiKey,
    },
  }).then(response => ({
    ...response,
    body: JSON.parse(response.body),
  }));
};
