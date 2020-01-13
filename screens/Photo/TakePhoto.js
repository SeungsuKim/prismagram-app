import { Camera as ExpoCammera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { IonIcon } from "../../components/NavIcon";
import constants from "../../constants";
import theme from "../../Styles";

const View = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${theme.backgroundColor};
`;
const Camera = styled(ExpoCammera)`
  width: ${constants.width};
  height: ${constants.width};
  justify-content: flex-end;
  padding: 10px;
`;
const Touchable = styled.TouchableOpacity``;
const CameraButton = styled.View``;
const ButtonContianer = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
`;
const Button = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  border-width: 13px;
  border-color: ${theme.lightGreyColor};
`;

export default ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef();

  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === "granted") {
        setHasPermission(true);
      }
    } catch (error) {
      console.log(error);
      hasPermission(false);
    }
  };

  const toggleCamera = () => {
    if (cameraType === Camera.Constants.Type.back) {
      setCameraType(Camera.Constants.Type.front);
    } else {
      setCameraType(Camera.Constants.Type.back);
    }
  };

  const takePhoto = async () => {
    try {
      const { uri } = await cameraRef.current.takePictureAsync({
        quality: 1
      });
      const asset = await MediaLibrary.createAssetAsync(uri);
      navigation.navigate("UploadPhoto", { photo: asset });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    askPermission();
  }, []);

  return (
    <View>
      {hasPermission ? (
        <>
          <Camera type={cameraType} ref={cameraRef}>
            <Touchable onPress={toggleCamera}>
              <CameraButton>
                <IonIcon name={"md-sync"} color={"white"} size={30} />
              </CameraButton>
            </Touchable>
          </Camera>
          <ButtonContianer>
            <Touchable onPress={takePhoto}>
              <Button />
            </Touchable>
          </ButtonContianer>
        </>
      ) : null}
    </View>
  );
};
