import React from "react";
import styled from "styled-components";
import AutoHeightImage from "react-native-auto-height-image";
import constants from "../../constants";
import AuthButton from "../../components/AuthButton";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const Image = styled(AutoHeightImage)`
  margin-bottom: 30px;
`;

const Touchable = styled.TouchableOpacity``;

const LoginLink = styled.View`
  margin-top: 25px;
`;

const LoginLinkText = styled.Text`
  color: ${props => props.theme.blueColor};
  font-weight: 600;
  text-align: center;
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
    ></AuthButton>
    <Touchable onPress={() => navigation.navigate("Login")}>
      <LoginLink>
        <LoginLinkText>Do you have an account?</LoginLinkText>
      </LoginLink>
    </Touchable>
  </View>
);
