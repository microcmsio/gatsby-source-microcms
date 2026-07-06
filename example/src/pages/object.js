import * as React from 'react';
import { graphql } from 'gatsby';

export default props => {
  const single = props.data.allMicrocmsPage.nodes[0];

  return (
    <div>
      <p>{single.title}</p>
      <span>
        {single.createdAt} - {single.updatedAt}
      </span>
    </div>
  );
};

export const query = graphql`
  {
    allMicrocmsPage {
      nodes {
        id
        title
        createdAt
        updatedAt
      }
    }
  }
`;
