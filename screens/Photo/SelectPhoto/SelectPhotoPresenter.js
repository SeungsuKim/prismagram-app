import React from "react";
import styled from "styled-components";

import Loader from "../../../components/Loader";
import constants from "../../../constants";

const View = styled.View``;
const PhotoContainer = styled.View``;
const AllPhotos = styled.ScrollView``;
const SelectedPhoto = styled.Image`
  width: ${constants.width};
  height: ${constants.width};
`;
const Touchable = styled.TouchableOpacity``;
const Photo = styled.Image`
  width: ${constants.width / 4};
  height: ${constants.width / 4};
  border-width: 1px;
  border-color: white;
  ${props => (props.selected ? "opacity: 0.3" : "opacity: 1")}
`;

const SelectPhotoPresenter = ({
  loading,
  selectedPhoto,
  allPhotos,
  changeSelected
}) => (
  <View>
    {loading ? (
      <Loader />
    ) : (
      <PhotoContainer>
        <SelectedPhoto source={{ uri: selectedPhoto.uri }} />
        <AllPhotos
          contentContainerStyle={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap"
          }}
        >
          {allPhotos &&
            allPhotos.map(photo => (
              <Touchable key={photo.id} onPress={() => changeSelected(photo)}>
                <Photo
                  source={{ uri: photo.uri }}
                  selected={selectedPhoto.id === photo.id}
                />
              </Touchable>
            ))}
        </AllPhotos>
      </PhotoContainer>
    )}
  </View>
);

export default SelectPhotoPresenter;
