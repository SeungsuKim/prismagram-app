import AuthButton from "../../components/AuthButton";
import AutoHeightImage from "react-native-auto-height-image";
import React from "react";
import TextLink from "../../components/TextLink";
import constants from "../../constants";
import styled from "styled-components";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const Image = styled(AutoHeightImage)`
  margin-bottom: 30px;
`;

export default ({ navigation }) => (
  <View>
    <Image
      width={constants.width / 2}
      source={require("../../assets/cursive-logo.png")}
    />
    <AuthButton
      text={"Create New Account"}
      onPress={() => navigation.navigate("Signup")}
    />
    <TextLink
      text={"Already have an account?"}
      onPress={() => navigation.navigate("Login")}
      style={{ "margin-top": "25px" }}
    />
  </View>
);
