const { createPluginConfig } = require('./pluginOptions');
const fetchData = require('./fetch');
const {
  isListContent,
  isObjectContent,
  createContentNode,
} = require('./utils');

const sourceNodes = async (
  { actions, createNodeId, reporter },
  pluginOptions
) => {
  const { createNode } = actions;

  const pluginConfig = createPluginConfig(pluginOptions);

  const apiUrl = `https://${pluginConfig.get(
    'serviceId'
  )}.microcms.io/api/${pluginConfig.get('version')}/${pluginConfig.get(
    'endpoint'
  )}`;

  const { statusCode, body } = await fetchData(
    apiUrl,
    pluginConfig.get('apiKey')
  );

  if (statusCode !== 200) {
    reporter.panic(`microCMS API ERROR:
statusCode: ${statusCode}
message: ${body.message}`);
  }

  // list content
  if (
    isListContent({
      format: pluginConfig.get('format'),
      content: body.contents,
    })
  ) {
    body.contents.forEach(content => {
      createContentNode({
        createNode,
        createNodeId,
        content: content,
        type: pluginConfig.get('type'),
      });
    });
  }
  // object content
  else if (
    isObjectContent({ format: pluginConfig.get('format'), content: body })
  ) {
    createContentNode({
      createNode,
      createNodeId,
      content: body,
      type: pluginConfig.get('type'),
    });
  }
};

module.exports = {
  sourceNodes,
};
