import PropTypes from "prop-types";
import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { Image, Text } from "react-native";
import Swiper from "react-native-swiper";
import { withNavigation } from "react-navigation";
import styled from "styled-components";

import { IonIcon, SimpleLineIcon } from "../components/NavIcon";
import constants from "../constants";
import { TOGGLE_LIKE } from "../queries/PostQueires";
import theme from "../Styles";

const Container = styled.View``;
const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
`;
const Touchable = styled.TouchableOpacity`
  ${props => props.style};
`;
const HeaderTextContainer = styled.View`
  margin-left: 10px;
`;
const Bold = styled.Text`
  font-weight: 500;
  ${props => props.style};
`;
const Location = styled.Text`
  font-size: 12px;
`;
const Meta = styled.View`
  padding: 10px;
`;
const IconContainer = styled.View`
  flex-direction: row;
`;
const InfoContainer = styled.View`
  margin-top: 5px;
`;
const Info = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;
const Caption = styled.Text`
  ${props => props.style};
`;
const More = styled.Text`
  color: ${theme.darkGreyColor};
`;
const CommentCount = styled.Text`
  margin-top: 5px;
  color: ${theme.darkGreyColor};
`;

const Post = ({
  navigation,
  id,
  user,
  files = [],
  likeCount,
  isLiked: isLikedProp,
  comments,
  createdAt,
  location,
  caption
}) => {
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [summarized, setSummarized] = useState(caption.length >= 100);

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE);

  const handleLike = async () => {
    try {
      await toggleLikeMutation({ variables: { postId: id } });
      setIsLiked(!isLiked);
    } catch ({ message }) {
      console.log(message);
    }
  };

  return (
    <Container>
      <Header>
        <Touchable
          onPress={() =>
            navigation.navigate("UserDetail", { username: user.username })
          }
        >
          <Image
            source={{ uri: user.avatar }}
            style={{ height: 30, width: 30, borderRadius: 15 }}
          />
        </Touchable>
        <Touchable
          onPress={() =>
            navigation.navigate("UserDetail", { username: user.username })
          }
        >
          <HeaderTextContainer>
            <Bold>{user.username}</Bold>
            {location && <Location>{location}</Location>}
          </HeaderTextContainer>
        </Touchable>
      </Header>
      <Swiper
        loop={false}
        style={{ height: constants.width }}
        paginationStyle={{ position: "absolute", top: constants.width + 24 }}
      >
        {files.map(file => (
          <Image
            key={file.id}
            source={{ uri: file.url }}
            style={{
              width: constants.width,
              height: constants.width
            }}
          />
        ))}
      </Swiper>
      <Meta>
        <IconContainer>
          <Touchable onPress={handleLike}>
            <IonIcon
              name={isLiked ? "ios-heart" : "ios-heart-empty"}
              size={27}
              color={isLiked ? theme.redColor : theme.blackColor}
            />
          </Touchable>
          <Touchable style={{ "margin-left": "10" }}>
            <SimpleLineIcon name={"bubble"} size={25} />
          </Touchable>
          <Touchable style={{ "margin-left": "10" }}>
            <SimpleLineIcon name={"paper-plane"} size={24} />
          </Touchable>
        </IconContainer>
        <InfoContainer>
          <Touchable>
            <Bold>{likeCount === 1 ? "1 like" : `${likeCount} likes`}</Bold>
          </Touchable>
          <Info>
            <Text>
              <Bold>{user.username}</Bold>
              <Caption>{"  "}</Caption>
              {!summarized ? (
                <Caption onPress={() => setSummarized(true)}>{caption}</Caption>
              ) : (
                <>
                  <Caption>{caption.slice(0, 100).concat("... ")}</Caption>
                  <More onPress={() => setSummarized(false)}>more</More>
                </>
              )}
            </Text>
          </Info>
        </InfoContainer>
        {comments.length === 0 ? null : (
          <Touchable>
            <CommentCount>See all {comments.length} comments</CommentCount>
          </Touchable>
        )}
      </Meta>
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

export default withNavigation(Post);
