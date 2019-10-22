const got = require('got');

module.exports = function fetchData(url, apiKey) {
  return got
    .get(url, {
      headers: {
        'X-API-KEY': apiKey,
      },
      json: true,
    })
    .catch(error => {
      return error.response;
    });
};
