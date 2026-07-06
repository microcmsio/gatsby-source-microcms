const path = require(`node:path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogPost = path.resolve('./src/templates/blog-post.js');

  const result = await graphql(
    `
      {
        allMicrocmsBlog(sort: { fields: [createdAt], order: DESC }) {
          edges {
            node {
              blogId
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

  result.data.allMicrocmsBlog.edges.forEach((post, index) => {
    createPage({
      path: post.node.blogId,
      component: blogPost,
      context: {
        slug: post.node.blogId,
      },
    });
  });
};
