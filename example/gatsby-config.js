const { loadEnvFile } = require('node:process');
const path = require('node:path');

loadEnvFile(path.resolve(__dirname, '.env'));

if (!process.env.MICROCMS_API_KEY || !process.env.MICROCMS_SERVICE_ID) {
  throw new Error('MICROCMS_API_KEY and MICROCMS_SERVICE_ID must be set');
}

const { and, equals, exists, notExists } = require('../src/query-builder');

module.exports = {
  siteMetadata: {
    title: 'Blog',
    description: 'My blog.',
    siteUrl: 'https://example.com/',
  },
  plugins: [
    {
      resolve: require.resolve('../gatsby-node'),
      options: {
        apiKey: process.env.MICROCMS_API_KEY,
        serviceId: process.env.MICROCMS_SERVICE_ID,
        apis: [
          {
            endpoint: 'blog',
            format: 'list',
            query: {
              limit: 100,
              fields: [
                'id',
                'blogId',
                'title',
                'contents',
                'createdAt',
                'updatedAt',
              ].join(','),
              filters: exists('title'),
            },
          },
          {
            endpoint: 'page',
            format: 'object',
          },
        ],
      },
    },
  ],
};
