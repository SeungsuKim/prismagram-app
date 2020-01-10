import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const Text = styled.Text``;

export default ({ navigation }) => (
  <View>
    <Text>TakePhoto</Text>
    <TouchableOpacity onPress={() => navigation.navigate("UploadPhoto")}>
      <Text>TakePhoto</Text>
    </TouchableOpacity>
  </View>
);
