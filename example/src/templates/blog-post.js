import * as React from 'react';
import { graphql } from 'gatsby';

export default props => {
  const { microcmsPost } = props.data;
  return (
    <div>
      <p>{microcmsPost.title}</p>
      <p>
        {microcmsPost.createdAt} - {microcmsPost.updatedAt}
      </p>
      <div dangerouslySetInnerHTML={{ __html: microcmsPost.body }} />
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
    microcmsPost(postId: { eq: $slug }) {
      postId
      title
      body
      createdAt(formatString: "YYYY.MM.DD")
      updatedAt(formatString: "YYYY.MM.DD")
    }
  }
`;
