const { createPluginConfig } = require('./pluginOptions');
const fetchData = require('./fetch');
const { createContentNode } = require('./utils');

const sourceNodes = async (
  { actions, createNodeId, reporter },
  pluginOptions
) => {
  const { createNode } = actions;

  const pluginConfig = createPluginConfig(pluginOptions);

  for await (const api of pluginConfig.get('apis')) {
    const apiUrl = `https://${pluginConfig.get(
      'serviceId'
    )}.microcms.io/api/${pluginConfig.get('version')}/${api.endpoint}`;

    const { format = 'list' } = api;

    // get all list data
    if (format === 'list') {
      let offset = 0;
      while (true) {
        const query = { ...api.query, offset };
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
          reporter.panic(
            `format set to 'list' but got ${typeof body.contents}`
          );
          return;
        }
        body.contents.forEach((content, index) => {
          createContentNode({
            createNode,
            createNodeId,
            sortIndex: offset + index,
            content,
            serviceId: pluginConfig.get('serviceId'),
            endpoint: api.endpoint,
            type: api.type,
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
    } else if (format === 'object') {
      // get object data
      const { statusCode, body } = await fetchData(apiUrl, {
        apiKey: pluginConfig.get('apiKey'),
        query: api.query,
      });

      if (statusCode !== 200) {
        reporter.panic(`microCMS API ERROR:
statusCode: ${statusCode}
message: ${body.message}`);
        return;
      }

      createContentNode({
        createNode,
        createNodeId,
        content: body,
        serviceId: pluginConfig.get('serviceId'),
        endpoint: api.endpoint,
        type: api.type,
      });
    }
  }
};

module.exports = {
  sourceNodes,
};
