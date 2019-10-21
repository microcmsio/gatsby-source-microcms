import * as React from 'react';
import { graphql } from 'gatsby';

export default props => {
  const single = props.data.allMicrocmsSingle.nodes[0];

  return (
    <div>
      <p>{single.title}</p>
      <span>
        {single.createdAt} - {single.updatedAt}
      </span>
    </div>
  );
};

export const pageQuery = graphql`
  query SingleQuery {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    allMicrocmsSingle {
      nodes {
        id
        title
        createdAt
        updatedAt
      }
    }
  }
`;
