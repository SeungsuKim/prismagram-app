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
