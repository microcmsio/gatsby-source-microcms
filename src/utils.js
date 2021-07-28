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
    !Array.isArray(content) &&
    !!Object.keys(content).length
  );
};

const createContentNode = ({
  createNode,
  createNodeId,
  sortIndex,
  content,
  type,
}) => {
  const nodeContent = JSON.stringify(content);
  const nodeId = createNodeId(content.id || nodeContent);
  const nodeContentDigest = crypto
    .createHash('md5')
    .update(nodeContent)
    .digest('hex');

  const node = {
    ...content,
    id: nodeId,
    sortIndex: sortIndex,
    parent: null,
    children: [],
    internal: {
      type: makeTypeName(type),
      content: nodeContent,
      contentDigest: nodeContentDigest,
    },
  };

  /**
   * To avoid conflicting named id,
   * rename to ${type}Id if content has id property.
   */
  if (content.id) {
    const contentIdName = camelCase([type, 'id']);
    node[contentIdName] = content.id;
  }

  createNode(node);
};

module.exports = {
  isListContent,
  isObjectContent,
  createContentNode,
  makeTypeName,
};
