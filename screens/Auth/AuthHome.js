import React from "react";
import AutoHeightImage from "react-native-auto-height-image";
import Divider from "react-native-divider";
import styled from "styled-components";

import theme from ".././../Styles";
import AuthButton from "../../components/AuthButton";
import TextLink from "../../components/TextLink";
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

const Controls = styled.View`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: stretch;
`;

const DividerContainer = styled.View`
  display: flex;
  justify-content: center;
  margin: 40px 20px;
`;

export default ({ navigation }) => (
  <View>
    <Image
      width={constants.width / 2}
      source={require("../../assets/cursive-logo.png")}
    />
    <Controls>
      <AuthButton
        text={"Create New Account"}
        onPress={() => navigation.navigate("Signup")}
      />
      <DividerContainer>
        <Divider orientation="center" color={theme.darkGreyColor}>
          or
        </Divider>
      </DividerContainer>
      <TextLink
        text={"Already have an account?"}
        onPress={() => navigation.navigate("Login")}
      />
    </Controls>
  </View>
);
