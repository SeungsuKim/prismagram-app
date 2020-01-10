import { gql } from "apollo-boost";

export const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      likeCount
      isLiked
      createdAt
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      comments {
        id
        text
        user {
          id
          username
        }
      }
    }
  }
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
