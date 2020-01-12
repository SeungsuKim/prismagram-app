import { gql } from "apollo-boost";

import { POST_FRAGMENT } from "../Fragments";

export const FEED_QUERY = gql`
  {
    seeFeed {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

export const TOOGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toogleLike(postId: $postId)
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: String!, $text: String!) {
    addComment(postId: $postId, text: $text) {
      id
      text
      user {
        username
      }
    }
  }
`;

export const POST_DETAIL = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;
