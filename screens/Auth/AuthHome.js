import React from "react";
import styled from "styled-components";
import AutoHeightImage from "react-native-auto-height-image";
import constants from "../../constants";

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

const SignUpButton = styled.View`
  background-color: ${props => props.theme.blueColor};
  padding: 10px;
  width: ${constants.width / 2};
  border-radius: 4px;
  margin-bottom: 25px;
`;

const SignUpButtonText = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;

const LoginLink = styled.View``;

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
    <Touchable onPress={() => navigation.navigate("Signup")}>
      <SignUpButton>
        <SignUpButtonText>Create New Account</SignUpButtonText>
      </SignUpButton>
    </Touchable>
    <Touchable onPress={() => navigation.navigate("Login")}>
      <LoginLink>
        <LoginLinkText>Do you have an account?</LoginLinkText>
      </LoginLink>
    </Touchable>
  </View>
);
