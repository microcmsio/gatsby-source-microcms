const nock = require('nock');
const fetchData = require('../fetch');

const apiKey = 'key';
const baseUrl = 'https://example.com';
const nockBase = nock(baseUrl, {
  reqheaders: {
    'x-api-key': apiKey,
  },
});

describe('fetch', () => {
  test('success fetch', async () => {
    nockBase.get('/success').reply(200, { contents: [] });
    const res = await fetchData(baseUrl + '/success', { apiKey });
    expect(res.statusCode).toBe(200);
    expect(res.req.headers['x-api-key']).toBe(apiKey);
  });

  test('query fetch', async () => {
    nockBase
      .get('/query')
      .query({ fields: 'id' })
      .reply(200, { contents: [{ id: '1' }] })
      .get('/noquery')
      .reply(200, { contents: [{ id: '2' }] })
      .get('/emptyquery')
      .reply(200, { contents: [{ id: '3' }] });

    // with query
    const res1 = await fetchData(baseUrl + '/query', {
      apiKey,
      query: { fields: 'id' },
    });
    expect(res1.statusCode).toBe(200);
    expect(res1.body.contents[0]['id']).toBe('1');

    // without query
    const res2 = await fetchData(baseUrl + '/noquery', {
      apiKey,
    });
    expect(res2.statusCode).toBe(200);
    expect(res2.body.contents[0]['id']).toBe('2');

    // empty query
    const res3 = await fetchData(baseUrl + '/emptyquery', {
      apiKey,
      query: {
        fields: '',
        limit: undefined,
        offset: null,
      },
    });
    expect(res3.statusCode).toBe(200);
    expect(res3.body.contents[0]['id']).toBe('3');
  });

  // TODO
  // test('error fetch', async () => {
  // });
});
