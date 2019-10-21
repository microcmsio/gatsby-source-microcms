import * as React from 'react';
import { graphql } from 'gatsby';

export default props => {
  const { microcmsPosts } = props.data;
  return (
    <div>
      <p>{microcmsPosts.title}</p>
      <p>
        {microcmsPosts.createdAt} - {microcmsPosts.updatedAt}
      </p>
      <div dangerouslySetInnerHTML={{ __html: microcmsPosts.body }} />
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
    microcmsPosts(postsId: { eq: $slug }) {
      postsId
      title
      body
      createdAt(formatString: "YYYY.MM.DD")
      updatedAt(formatString: "YYYY.MM.DD")
    }
  }
`;
