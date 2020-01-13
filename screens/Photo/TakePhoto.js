import { Camera as ExpoCammera } from "expo-camera";
import * as Permissions from "expo-permissions";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import constants from "../../constants";

const View = styled.View`
  flex: 1;
  background-color: white;
`;
const Camera = styled(ExpoCammera)`
  width: ${constants.width};
  height: ${constants.width};
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(false);

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

  useEffect(async () => {
    askPermission();
  }, []);

  return <View>{hasPermission ? <Camera /> : null}</View>;
};
