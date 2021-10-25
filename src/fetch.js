const qs = require('querystring');
const fetch = require('node-fetch');

/**
 * @param {string} url
 * @param {Object} param
 * @param {string} param.apiKey
 * @param {object} param.query
 */
module.exports = function fetchData(url, { apiKey, query }) {
  // remove empty string or undefined or null query
  for (let q in query) {
    if (!query[q]) {
      delete query[q];
    }
  }

  const params = qs.stringify(query);
  const reqUrl = url + (params ? `?${params}` : '');

  return fetch(reqUrl, {
    headers: {
      'x-microcms-api-key': apiKey,
    },
  }).then(async res => {
    const body = await res.json();
    return { body, statusCode: res.status };
  });
};
