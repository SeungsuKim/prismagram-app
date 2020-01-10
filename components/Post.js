import PropTypes from "prop-types";
import React from "react";
import { Image } from "react-native";
import styled from "styled-components";

const Container = styled.View``;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
`;

const Touchable = styled.TouchableOpacity``;

const HeaderTextContainer = styled.View`
  margin-left: 10px;
`;

const Bold = styled.Text`
  font-weight: 500;
`;

const Location = styled.Text`
  font-size: 12px;
`;

const Post = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  createdAt,
  location,
  caption
}) => {
  return (
    <Container>
      <Header>
        <Touchable>
          <Image
            source={{ uri: user.avatar }}
            style={{ height: 30, width: 30, borderRadius: 15 }}
          />
        </Touchable>
        <Touchable>
          <HeaderTextContainer>
            <Bold>{user.username}</Bold>
            {location && <Location>{location}</Location>}
          </HeaderTextContainer>
        </Touchable>
      </Header>
    </Container>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ),
  createdAt: PropTypes.string.isRequired,
  location: PropTypes.string,
  caption: PropTypes.string.isRequired
};

export default Post;
