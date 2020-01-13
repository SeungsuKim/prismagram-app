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
const Photo = styled.Image`
  width: ${constants.width / 4};
  height: ${constants.width / 4};
  border-width: 1px;
  border-color: white;
`;

export default () => {
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
      const [firstPhoto, ...allPhotos] = assets;
      setSelectedPhoto(firstPhoto);
      setAllPhotos(allPhotos);
    } catch (error) {
      console.log(error);
    }
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
                <Photo key={photo.id} source={{ uri: photo.uri }} />
              ))}
          </AllPhotos>
        </PhotoContainer>
      )}
    </View>
  );
};
