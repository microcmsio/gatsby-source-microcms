import * as React from 'react';
import { graphql } from 'gatsby';

export default props => {
  const single = props.data.allMicrocmsGatsbyobject.nodes[0];

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
    allMicrocmsGatsbyobject {
      nodes {
        id
        title
        createdAt
        updatedAt
      }
    }
  }
`;
