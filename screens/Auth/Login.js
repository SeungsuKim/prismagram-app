import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";

import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import { LOG_IN } from "../../queries/AuthQueries";
import TextLink from "../../components/TextLink";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-apollo-hooks";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export default ({ navigation }) => {
  const emailInput = useInput("");
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
        <AuthInput
          {...emailInput}
          placeholder={"Email"}
          keyboardType={"email-address"}
          onSubmitEditing={handleLogin}
          disabled={loading}
        />
        <AuthButton text="Log In" onPress={handleLogin} loading={loading} />
        <TextLink
          text="Don't have an account?"
          onPress={() => navigation.navigate("Signup")}
          style={{ "margin-top": "25px" }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
