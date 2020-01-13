import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import constants from "../constants";
import theme from "../Styles";
import { FeatherIcon, SimpleLineIcon } from "./NavIcon";

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
`;
const Button = styled.TouchableOpacity`
  width: ${constants.width / 2};
  align-items: center;
`;

const UserProfile = ({
  avatar,
  bio,
  fullName,
  postCount,
  followingCount,
  followerCount
}) => (
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
      <Button>
        <SimpleLineIcon name={"grid"} />
      </Button>
      <Button>
        <FeatherIcon name={"menu"} />
      </Button>
    </ButtonContainer>
  </View>
);

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
