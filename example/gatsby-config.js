require('dotenv').config();

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
        endpoint: 'posts',
        type: 'post',
      },
    },
    {
      resolve: require.resolve('../gatsby-node'),
      options: {
        apiKey: process.env.MICROCMS_API_KEY,
        serviceId: process.env.MICROCMS_SERVICE_ID,
        endpoint: 'gatsby-object',
        format: 'object',
        type: 'single',
      },
    },
  ],
};
