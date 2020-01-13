import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Loader from "../../components/Loader";
import constants from "../../constants";

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

export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [allPhotos, setAllPhotos] = useState([]);

  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        setHasPermission(true);
        await getPhotos();
      }
    } catch (error) {
      console.log(error);
      hasPermission(false);
    } finally {
      setLoading(false);
    }
  };

  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync();
      const [firstPhoto] = assets;
      setSelectedPhoto(firstPhoto);
      setAllPhotos(assets);
    } catch (error) {
      console.log(error);
    }
  };

  const changeSelected = photo => {
    setSelectedPhoto(photo);
    navigation.setParams({ photo });
  };

  useEffect(() => {
    askPermission();
  }, []);

  return (
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
};
