import * as React from 'react';
import { graphql, Link } from 'gatsby';

export default props => {
  const posts = props.data.allMicrocmsPost.nodes.map(node => {
    return (
      <div key={node.postId}>
        <Link to={node.postId}>{node.title}</Link>
        <span>
          {node.createdAt} - {node.updatedAt}
        </span>
      </div>
    );
  });

  return <div>{posts}</div>;
};

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    allMicrocmsPost {
      nodes {
        postId
        title
        body
        createdAt(formatString: "YYYY.MM.DD")
        updatedAt(formatString: "YYYY.MM.DD")
      }
    }
  }
`;
