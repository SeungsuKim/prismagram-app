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
import { CREATE_ACCOUNT } from "../../queries/AuthQueries";

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
  const firstNameInput = useInput("");
  const lastNameInput = useInput("");
  const emailInput = useInput(navigation.getParam("email") || "");
  const usernameInput = useInput("");
  const [loading, setLoading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: emailInput.value,
      username: usernameInput.value,
      firstName: firstNameInput.value,
      lastName: lastNameInput.value
    }
  });

  const handleSignup = async () => {
    const { value: firstName } = firstNameInput;
    const { value: lastName } = lastNameInput;
    const { value: email } = emailInput;
    const { value: username } = usernameInput;

    if (firstName === "") {
      return Alert.alert("First name cannot be empty");
    }

    if (lastName === "") {
      return Alert.alert("Last name cannot be empty");
    }

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return Alert.alert("Please write a valid email");
    }

    if (username === "") {
      return Alert.alert("Username cannot be empty");
    }

    setLoading(true);

    try {
      const {
        data: { createAccount }
      } = await createAccountMutation();
      if (createAccount) {
        Alert.alert("Account created", "Log in now!");
        navigation.navigate("Login", { email });
      } else {
        Alert.alert("Cannot create an account");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("This username has already taken");
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
            {...firstNameInput}
            placeholder={"First name"}
            Last
            disabled={loading}
            autoCapitalize={"words"}
          />
          <AuthInput
            {...lastNameInput}
            placeholder={"Last name"}
            disabled={loading}
            autoCapitalize={"words"}
          />
          <AuthInput
            {...emailInput}
            placeholder={"Email"}
            keyboardType={"email-address"}
            disabled={loading}
          />
          <AuthInput
            {...usernameInput}
            placeholder={"Username"}
            disabled={loading}
          />
          <AuthButton
            text="Sign Up"
            onPress={handleSignup}
            loading={loading}
            style={{ "margin-top": "10px" }}
          />
          <DividerContainer>
            <Divider orientation="center" color={theme.darkGreyColor}>
              or
            </Divider>
          </DividerContainer>
          <TextLink
            text="Already have an account?"
            onPress={() => {
              Keyboard.dismiss();
              navigation.navigate("Login", { email: emailInput.value });
            }}
          />
        </Controls>
      </View>
    </TouchableWithoutFeedback>
  );
};
