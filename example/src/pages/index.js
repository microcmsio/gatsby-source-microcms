import * as React from 'react';
import { graphql, Link } from 'gatsby';

export default props => {
  const posts = props.data.allMicrocmsBlog.nodes.map(node => {
    return (
      <div key={node.id}>
        <Link to={node.blogId}>{node.title}</Link>
        <span>
          {node.createdAt} - {node.updatedAt}
        </span>
      </div>
    );
  });

  return (
    <div>
      {posts}
      <hr />
      <Link to="/object">オブジェクト</Link>
    </div>
  );
};

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    allMicrocmsBlog {
      nodes {
        id
        blogId
        title
        contents
        createdAt(formatString: "YYYY.MM.DD")
        updatedAt(formatString: "YYYY.MM.DD")
      }
    }
  }
`;
