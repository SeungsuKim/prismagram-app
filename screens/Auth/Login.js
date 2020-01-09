import React, { useState } from "react";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "react-apollo-hooks";
import styled from "styled-components";

import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { LOG_IN } from "../../queries/AuthQueries";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export default ({ navigation }) => {
  const emailInput = useInput("");
  const [loading, setLoading] = useState(false);
  const requestSecret = useMutation(LOG_IN, {
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
      await requestSecret();
      Alert.alert("Cheked your email");
      navigation.navigate("Confirm");
    } catch (error) {
      console.log(error);
      Alert.alert("Cannot log in now");
    } finally {
      setLoading(false);
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
        <AuthButton text="Log In" onPress={handleLogin} loading={loading} />
      </View>
    </TouchableWithoutFeedback>
  );
};
