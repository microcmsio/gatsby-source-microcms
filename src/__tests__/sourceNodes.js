const { sourceNodes } = require('../sourceNodes');

let mockResponse = {};

jest.mock('../fetch', () => {
  return async () => mockResponse;
});

const actions = {
  createNode: jest.fn(),
};
const createNodeId = jest.fn().mockReturnValue('nodeId');
const reporter = {
  panic: jest.fn(),
};

beforeEach(() => {
  actions.createNode.mockClear();
  createNodeId.mockClear();
  reporter.panic.mockClear();
});

const listPluginOptions = {
  apiKey: 'key',
  serviceId: 'id',
  version: 'v1',
  apis: [{
    endpoint: 'list',
  }]
};

const objectPluginOptions = {
  apiKey: 'key',
  serviceId: 'id',
  version: 'v1',
  apis: [{
    endpoint: 'object',
    format: 'object',
  }]
};

describe('sourceNodes', () => {
  test('sourceNodes with list, success response', async () => {
    mockResponse = {
      statusCode: 200,
      body: { contents: [{ id: '1' }, { id: '2' }], totalCount: 2 },
    };
    await sourceNodes({ actions, createNodeId, reporter }, listPluginOptions);
    expect(actions.createNode.mock.calls.length).toBe(2);
    expect(createNodeId.mock.calls.length).toBe(2);
    expect(reporter.panic).not.toBeCalled();
  });

  test('sourceNodes with list, error response', async () => {
    mockResponse = {
      statusCode: 400,
      body: { message: 'error' },
    };
    await sourceNodes({ actions, createNodeId, reporter }, listPluginOptions);
    expect(actions.createNode).not.toBeCalled();
    expect(createNodeId).not.toBeCalled();
    expect(reporter.panic.mock.calls.length).toBe(1);
  });

  test('sourceNodes with object, success response', async () => {
    mockResponse = {
      statusCode: 200,
      body: { id: 'id' },
    };
    await sourceNodes(
      { actions, createNodeId, reporter },
      objectPluginOptions
    );
    expect(actions.createNode.mock.calls.length).toBe(1);
    expect(createNodeId.mock.calls.length).toBe(1);
    expect(reporter.panic).not.toBeCalled();
  });

  test('sourceNodes with object, error response', async () => {
    mockResponse = { statusCode: 400, body: { message: 'error' } };
    await sourceNodes(
      { actions, createNodeId, reporter },
      objectPluginOptions
    );
    expect(actions.createNode).not.toBeCalled();
    expect(createNodeId).not.toBeCalled();
    expect(reporter.panic.mock.calls.length).toBe(1);
  });

  test('sourceNodes with list and readAll, success response', async () => {
    const options = {
      apiKey: 'key',
      serviceId: 'id',
      version: 'v1',
      apis: [{
        endpoint: 'point',
        format: 'list',
      }]
    };
    mockResponse = {
      statusCode: 200,
      body: { contents: [{ id: '1' }, { id: '2' }], totalCount: 2 },
    };
    await sourceNodes({ actions, createNodeId, reporter }, options);
    expect(actions.createNode.mock.calls.length).toBe(2);
    expect(createNodeId.mock.calls.length).toBe(2);
    expect(reporter.panic).not.toBeCalled();
  });

  test('sourceNodes with list and readAll, success response', async () => {
    const options = {
      apiKey: 'key',
      serviceId: 'id',
      version: 'v1',
      apis: [{
        endpoint: 'point',
        format: 'list',
        query: {
          limit: 3,
        },
      }]
    };
    mockResponse = {
      statusCode: 200,
      body: {
        contents: [{ id: '1' }, { id: '2' }, { id: '3' }],
        totalCount: 12,
      },
    };
    await sourceNodes({ actions, createNodeId, reporter }, options);
    expect(actions.createNode.mock.calls.length).toBe(12);
    expect(createNodeId.mock.calls.length).toBe(12);
    expect(reporter.panic).not.toBeCalled();
  });
  test('sourceNodes with list, error response', async () => {
    const options = {
      apiKey: 'key',
      serviceId: 'id',
      version: 'v1',
      apis: [{
        endpoint: 'point',
        format: 'list',
      }]
    };
    mockResponse = {
      statusCode: 400,
      body: { message: 'error' },
    };
    await sourceNodes({ actions, createNodeId, reporter }, options);
    expect(actions.createNode).not.toBeCalled();
    expect(createNodeId).not.toBeCalled();
    expect(reporter.panic.mock.calls.length).toBe(1);
  });

  test('sourceNodes with list, error response', async () => {
    const options = {
      apiKey: 'key',
      serviceId: 'id',
      version: 'v1',
      apis: [{
        endpoint: 'point',
        format: 'list',
      }]
    };
    mockResponse = {
      statusCode: 200,
      body: { content: { id: '1' }, totalCount: 1 },
    };
    await sourceNodes({ actions, createNodeId, reporter }, options);
    expect(actions.createNode).not.toBeCalled();
    expect(createNodeId).not.toBeCalled();
    expect(reporter.panic.mock.calls.length).toBe(1);
  });
  test('sourceNodes with list and readAll, success response', async () => {
    const options = {
      apiKey: 'key',
      serviceId: 'id',
      version: 'v1',
      apis: [{
        endpoint: 'point',
        format: 'list',
        query: {
          limit: 0,
        },
      }]
    };
    mockResponse = {
      statusCode: 200,
      body: {
        contents: [{ id: '1' }, { id: '2' }, { id: '3' }],
        totalCount: 3,
      },
    };
    await sourceNodes({ actions, createNodeId, reporter }, options);
    expect(actions.createNode.mock.calls.length).toBe(3);
    expect(createNodeId.mock.calls.length).toBe(3);
    expect(reporter.panic).not.toBeCalled();
  });
  test('sourceNodes with list and readAll, success response', async () => {
    const options = {
      apiKey: 'key',
      serviceId: 'id',
      version: 'v1',
      apis: [{
        endpoint: 'point',
        format: 'list',
        query: {
          limit: 20,
        },
      }]
    };
    mockResponse = {
      statusCode: 200,
      body: { contents: [{ id: '1' }, { id: '2' }, { id: '3' }] },
    };
    await sourceNodes({ actions, createNodeId, reporter }, options);
    expect(actions.createNode.mock.calls.length).toBe(3);
    expect(createNodeId.mock.calls.length).toBe(3);
    expect(reporter.panic).not.toBeCalled();
  });
  test('sourceNodes with list and readAll, success response', async () => {
    const options = {
      apiKey: 'key',
      serviceId: 'id',
      version: 'v1',
      apis: [{
        endpoint: 'point',
        format: 'list',
        query: {
          limit: 1,
        },
      }]
    };
    mockResponse = {
      statusCode: 200,
      body: { contents: [{ id: '1' }], totalCount: 3 },
    };
    await sourceNodes({ actions, createNodeId, reporter }, options);
    expect(actions.createNode.mock.calls.length).toBe(3);
    expect(createNodeId.mock.calls.length).toBe(3);
    expect(reporter.panic).not.toBeCalled();
  });
});
