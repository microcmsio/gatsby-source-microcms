const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogPost = path.resolve('./src/templates/blog-post.js');

  const result = await graphql(
    `
      {
        allMicrocmsPosts(sort: { fields: [createdAt], order: DESC }) {
          edges {
            node {
              postsId
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

  result.data.allMicrocmsPosts.edges.forEach((post, index) => {
    createPage({
      path: post.node.postsId,
      component: blogPost,
      context: {
        slug: post.node.postsId,
      },
    });
  });
};
