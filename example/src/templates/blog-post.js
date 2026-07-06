import * as React from 'react';
import { graphql } from 'gatsby';

export default props => {
  const { microcmsBlog } = props.data;
  return (
    <div>
      <p>{microcmsBlog.title}</p>
      <p>
        {microcmsBlog.createdAt} - {microcmsBlog.updatedAt}
      </p>
      <div dangerouslySetInnerHTML={{ __html: microcmsBlog.contents }} />
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
    microcmsBlog(blogId: { eq: $slug }) {
      title
      contents
      createdAt(formatString: "YYYY.MM.DD")
      updatedAt(formatString: "YYYY.MM.DD")
    }
  }
`;
