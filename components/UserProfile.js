import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";

import constants from "../constants";
import theme from "../Styles";
import { FeatherIcon, SimpleLineIcon } from "./NavIcon";
import Post from "./Post";
import SquarePhoto from "./SquarePhoto";

const View = styled.View`
  background-color: ${theme.backgroundColor};
`;

const ProfileHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;
const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;
const HeaderColumn = styled.View`
  flex: 1;
  margin-left: 20px;
  padding: 0px 15px;
`;
const ProfileStats = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Stat = styled.View`
  display: flex;
  align-items: center;
`;
const StatNumber = styled.Text`
  font-weight: 600;
  font-size: 20px;
`;
const StatName = styled.Text`
  font-size: 12px;
  color: ${theme.darkGreyColor};
`;
const ProfileMeta = styled.View`
  padding: 0px 20px;
  margin-bottom: 20px;
`;
const UserName = styled.Text`
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 5px;
`;
const Bio = styled.Text``;
const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 2px;
`;
const Button = styled.TouchableOpacity`
  width: ${constants.width / 2};
  align-items: center;
  padding: 5px 0px;
  ${props =>
    props.active
      ? `border-bottom-width : 1px; border-color ${theme.blackColor}`
      : ""}
`;

const UserProfile = ({
  avatar,
  bio,
  fullName,
  postCount,
  followingCount,
  followerCount,
  posts
}) => {
  const [isGrid, setIsGrid] = useState(true);

  return (
    <View>
      <ProfileHeader>
        <Avatar source={{ uri: avatar }} />
        <HeaderColumn>
          <ProfileStats>
            <Stat>
              <StatNumber>{postCount}</StatNumber>
              <StatName>posts</StatName>
            </Stat>
            <Stat>
              <StatNumber>{followerCount}</StatNumber>
              <StatName>followers</StatName>
            </Stat>
            <Stat>
              <StatNumber>{followingCount}</StatNumber>
              <StatName>following</StatName>
            </Stat>
          </ProfileStats>
        </HeaderColumn>
      </ProfileHeader>
      <ProfileMeta>
        <UserName>{fullName}</UserName>
        <Bio>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s,
        </Bio>
      </ProfileMeta>
      <ButtonContainer>
        <Button onPress={() => setIsGrid(true)} active={isGrid}>
          <SimpleLineIcon
            name={"grid"}
            color={isGrid ? theme.blackColor : theme.darkGreyColor}
          />
        </Button>
        <Button onPress={() => setIsGrid(false)} active={!isGrid}>
          <FeatherIcon
            name={"menu"}
            color={isGrid ? theme.darkGreyColor : theme.blackColor}
          />
        </Button>
      </ButtonContainer>
      {posts &&
        posts.map(post =>
          isGrid ? (
            <SquarePhoto key={post.id} {...post} />
          ) : (
            <Post key={post.id} {...post} />
          )
        )}
    </View>
  );
};

UserProfile.propTypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  isSelf: PropTypes.bool.isRequired,
  bio: PropTypes.string,
  followingCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  postCount: PropTypes.number.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  )
};

export default UserProfile;
