const {
  makeTypeName,
  isListContent,
  isObjectContent,
  createContentNode,
} = require('../utils');

const createNode = jest.fn();
const createNodeId = jest.fn();

beforeEach(() => {
  createNode.mockClear();
  createNodeId.mockClear();
});

test('makeTypeName', () => {
  expect(makeTypeName('type')).toBe('MicrocmsType');
  expect(makeTypeName('Type')).toBe('MicrocmsType');
});

describe('content type', () => {
  test('isListContent', () => {
    expect(isListContent({ format: 'list', content: [] })).toBe(true);
    expect(isListContent({ format: 'list', content: {} })).toBe(false);
    expect(isListContent({ format: 'invalid', content: [] })).toBe(false);
  });

  test('isObjectContent', () => {
    expect(
      isObjectContent({
        format: 'object',
        content: {
          id: 'id',
        },
      })
    ).toBe(true);
    expect(isObjectContent({ format: 'object', content: {} })).toBe(false);
    expect(
      isObjectContent({
        format: 'invalid',
        content: {
          id: 'id',
        },
      })
    ).toBe(false);
  });
});

describe('createContentNode', () => {
  test('content id', () => {
    createNodeId.mockReturnValue('nodeId');
    createContentNode({
      createNode,
      createNodeId,
      content: { id: 'abcde' },
      type: 'post',
    });
    expect(createNode.mock.calls).toMatchSnapshot();
  });

  test('content body', () => {
    createNodeId.mockReturnValue('nodeId');
    createContentNode({
      createNode,
      createNodeId,
      content: { id: 'vwxyz', body: 'content' },
      type: 'news',
    });
    expect(createNode.mock.calls).toMatchSnapshot();
  });
});
