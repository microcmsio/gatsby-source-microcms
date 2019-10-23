const qs = require('querystring');
const got = require('got');

module.exports = function fetchData(url, { apiKey, query }) {
  // remove empty string or undefined or null query
  for (let q in query) {
    if (!query[q]) {
      delete query[q];
    }
  }

  return got
    .get(url, {
      headers: {
        'x-api-key': apiKey,
      },
      json: true,
      query: qs.stringify(query) || undefined,
    })
    .catch(error => {
      return error.response;
    });
};
