const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogPost = path.resolve('./src/templates/blog-post.js');

  const result = await graphql(
    `
      {
        allMicrocmsGatsbylist(sort: { fields: [createdAt], order: DESC }) {
          edges {
            node {
              gatsbylistId
              createdAt
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  result.data.allMicrocmsGatsbylist.edges.forEach((post, index) => {
    createPage({
      path: post.node.gatsbylistId,
      component: blogPost,
      context: {
        slug: post.node.gatsbylistId,
      },
    });
  });
};
