import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import styled from "styled-components";

import Loader from "../../components/Loader";
import constants from "../../constants";

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
      console.log(selectedPhoto);
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
        <Image
          source={{ uri: selectedPhoto.uri }}
          style={{ width: constants.width, height: constants.width }}
        />
      )}
    </View>
  );
};
