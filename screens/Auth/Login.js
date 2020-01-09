import React from "react";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";

import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export default () => {
  const emailInput = useInput("");

  const handleLogin = () => {
    const { value } = emailInput;

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(value)) {
      return Alert.alert("Please write a valid email");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...emailInput}
          placeholder={"Email"}
          keyboardType={"email-address"}
          onSubmitEditing={handleLogin}
        />
        <AuthButton text="Log In" onPress={handleLogin} />
      </View>
    </TouchableWithoutFeedback>
  );
};
