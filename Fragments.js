import { gql } from "apollo-boost";

export const POST_FRAGMENT = gql`
  fragment PostParts on Post {
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
`;
