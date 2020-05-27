import * as React from 'react';
import { graphql } from 'gatsby';

export default props => {
  const { microcmsGatsbylist } = props.data;
  return (
    <div>
      <p>{microcmsGatsbylist.title}</p>
      <p>
        {microcmsGatsbylist.createdAt} - {microcmsGatsbylist.updatedAt}
      </p>
      <div dangerouslySetInnerHTML={{ __html: microcmsGatsbylist.body }} />
    </div>
  );
};

export const pageQuery = graphql`
  query BlogPost($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    microcmsGatsbylist(gatsbylistId: { eq: $slug }) {
      title
      body
      createdAt(formatString: "YYYY.MM.DD")
      updatedAt(formatString: "YYYY.MM.DD")
    }
  }
`;
