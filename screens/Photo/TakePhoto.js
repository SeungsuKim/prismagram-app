import { Camera as ExpoCammera } from "expo-camera";
import * as Permissions from "expo-permissions";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { IonIcon } from "../../components/NavIcon";
import constants from "../../constants";

const View = styled.View`
  flex: 1;
  background-color: white;
`;
const Camera = styled(ExpoCammera)`
  width: ${constants.width};
  height: ${constants.width};
  justify-content: flex-end;
  padding: 10px;
`;
const Touchable = styled.TouchableOpacity``;
const CameraButton = styled.View``;

export default ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);

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

  useEffect(async () => {
    askPermission();
  }, []);

  return (
    <View>
      {hasPermission ? (
        <Camera type={cameraType}>
          <Touchable onPress={toggleCamera}>
            <CameraButton>
              <IonIcon name={"md-sync"} color={"white"} size={30} />
            </CameraButton>
          </Touchable>
        </Camera>
      ) : null}
    </View>
  );
};
