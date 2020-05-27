import * as React from 'react';
import { graphql, Link } from 'gatsby';

export default props => {
  const posts = props.data.allMicrocmsGatsbylist.nodes.map(node => {
    return (
      <div key={node.id}>
        <Link to={node.gatsbylistId}>{node.title}</Link>
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
    allMicrocmsGatsbylist {
      nodes {
        id
        gatsbylistId
        title
        body
        createdAt(formatString: "YYYY.MM.DD")
        updatedAt(formatString: "YYYY.MM.DD")
      }
    }
  }
`;
