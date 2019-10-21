const crypto = require('crypto');
const camelCase = require('camelcase');

const typePrefix = 'Microcms';
const makeTypeName = type =>
  camelCase([typePrefix, type], { pascalCase: true });

const isListContent = ({ format, content }) => {
  return format === 'list' && Array.isArray(content);
};

const isObjectContent = ({ format, content }) => {
  return (
    format === 'object' &&
    typeof content === 'object' &&
    typeof content.id === 'string'
  );
};

const createContentNode = ({ createNode, createNodeId, content, type }) => {
  const nodeId = createNodeId(content.id);
  const nodeContent = JSON.stringify(content);
  const nodeContentDigest = crypto
    .createHash('md5')
    .update(nodeContent)
    .digest('hex');

  const contentIdName = camelCase([type, 'id']);

  const node = {
    ...content,
    [contentIdName]: content.id, // content id
    id: nodeId,
    parent: null,
    children: [],
    internal: {
      type: makeTypeName(type),
      content: nodeContent,
      contentDigest: nodeContentDigest,
    },
  };

  createNode(node);
};

module.exports = {
  isListContent,
  isObjectContent,
  createContentNode,
  makeTypeName,
};
