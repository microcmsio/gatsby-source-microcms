const nock = require('nock');
const fetchData = require('../fetch');

const apiKey = 'key';
const baseUrl = 'https://example.com';
const nockBase = nock(baseUrl, {
  reqheaders: {
    'x-microcms-api-key': apiKey,
  },
}).matchHeader('x-microcms-api-key', apiKey);

describe('fetch', () => {
  test('default', async () => {
    nockBase.get('/default').reply(200, { contents: [] });
    const res = await fetchData(baseUrl + '/default', { apiKey });
    expect(res.statusCode).toBe(200);
  });

  test('query', async () => {
    nockBase
      .get('/query')
      .query({ fields: 'id' })
      .reply(200, { contents: [{ id: '1' }] });
    const res = await fetchData(baseUrl + '/query', {
      apiKey,
      query: { fields: 'id' },
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.contents[0]['id']).toBe('1');
  });

  test('delete query', async () => {
    nockBase.get('/deletequery').reply(200, { contents: [{ id: '1' }] });
    const res = await fetchData(baseUrl + '/deletequery', {
      apiKey,
      query: {
        // should be deleted
        draftKey: '',
        fields: undefined,
        limit: false,
        offset: null,
      },
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.contents[0]['id']).toBe('1');
  });

  test('error fetch', async () => {
    nockBase.get('/error').reply(400);
    await expect(fetchData(baseUrl + '/error', apiKey)).rejects.toThrow();
  });
});
