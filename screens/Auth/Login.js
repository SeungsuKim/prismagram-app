import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
import Divider from "react-native-divider";
import styled from "styled-components";

import theme from ".././../Styles";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import TextLink from "../../components/TextLink";
import constants from "../../constants";
import useInput from "../../hooks/useInput";
import { LOG_IN } from "../../queries/AuthQueries";

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
  align-items: stretch;
  width: 100%;
`;

const DividerContainer = styled.View`
  display: flex;
  justify-content: center;
  margin: 40px 20px;
`;

export default ({ navigation }) => {
  const emailInput = useInput(navigation.getParam("email") || "");
  const [loading, setLoading] = useState(false);
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: { email: emailInput.value }
  });

  const handleLogin = async () => {
    const { value } = emailInput;

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(value)) {
      return Alert.alert("Please write a valid email");
    }

    setLoading(true);

    try {
      const {
        data: { requestSecret }
      } = await requestSecretMutation();
      if (requestSecret) {
        navigation.navigate("Confirm", { email: value });
      } else {
        Alert.alert("Account not found");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Cannot log in now");
    } finally {
      setLoading(false);
    }

    return;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Image
          width={constants.width / 2}
          source={require("../../assets/cursive-logo.png")}
        />
        <Controls>
          <AuthInput
            {...emailInput}
            placeholder={"Email"}
            keyboardType={"email-address"}
            onSubmitEditing={handleLogin}
            disabled={loading}
          />
          <AuthButton
            text="Log In"
            onPress={handleLogin}
            loading={loading}
            style={{ "margin-top": "10px" }}
          />
          <DividerContainer>
            <Divider orientation="center" color={theme.darkGreyColor}>
              or
            </Divider>
          </DividerContainer>
          <TextLink
            text="Don't have an account?"
            onPress={() =>
              navigation.navigate("Signup", { email: emailInput.value })
            }
          />
        </Controls>
      </View>
    </TouchableWithoutFeedback>
  );
};
