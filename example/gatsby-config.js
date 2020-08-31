require('dotenv').config();

// We prepared one service to make it easy for anyone to develop.
const MICROCMS_API_KEY = 'dc59f358-4622-471f-8d1e-6c7a6f969558';
const MICROCMS_SERVICE_ID = 'example';

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
        apiKey: process.env.MICROCMS_API_KEY || MICROCMS_API_KEY,
        serviceId: process.env.MICROCMS_SERVICE_ID || MICROCMS_SERVICE_ID,
        apis: [
          {
            endpoint: 'gatsbylist',
            format: 'list',
            query: {
              limit: 100,
              fields: [
                'id',
                'postsId',
                'title',
                'body',
                'createdAt',
                'updatedAt',
              ].join(','),
              filters: exists('title'),
            }
          },
          {
            endpoint: 'gatsbyobject',
            format: 'object'
          }
        ]
      },
    }
  ],
};
