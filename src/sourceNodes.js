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
  // type option. default is endpoint value.
  const type = pluginConfig.get('type') || pluginConfig.get('endpoint');

  if (pluginConfig.get('readAll') && pluginConfig.get('format') === 'list') {
    let offset = 0;
    while (true) {
      const query = { ...pluginConfig.get('query'), offset };
      const { statusCode, body } = await fetchData(apiUrl, {
        apiKey: pluginConfig.get('apiKey'),
        query,
      });
      if (statusCode !== 200) {
        reporter.panic(`microCMS API ERROR:
statusCode: ${statusCode}
message: ${body.message}`);
        return;
      }

      if (!Array.isArray(body.contents)) {
        reporter.panic(`format set to 'list' but got ${typeof body.contents}`);
        return;
      }
      body.contents.forEach(content => {
        createContentNode({
          createNode,
          createNodeId,
          content: content,
          type: type,
        });
      });

      const limit = query.limit || 10;

      // totalCount not found
      if (!body.totalCount) {
        break;
      }

      offset += limit;
      if (offset >= body.totalCount) {
        break;
      }
    }
    return;
  }

  const { statusCode, body } = await fetchData(apiUrl, {
    apiKey: pluginConfig.get('apiKey'),
    query: pluginConfig.get('query'),
  });

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
        type: type,
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
      type: type,
    });
  }
};

module.exports = {
  sourceNodes,
};
