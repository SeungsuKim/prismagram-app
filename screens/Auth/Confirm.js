import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { useLogIn, useLogin } from "../../AuthContext";

import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import { CONFIRM_SECRET } from "../../queries/AuthQueries";
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
  const confirmInput = useInput("");
  const [loading, setLoading] = useState(false);
  const logIn = useLogIn();
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: navigation.getParam("email"),
      secret: confirmInput.value
    }
  });

  const handleConfirm = async () => {
    const { value } = confirmInput;

    if (value === "") {
      return Alert.alert("Please write secret");
    }

    setLoading(true);

    try {
      const {
        data: { confirmSecret }
      } = await confirmSecretMutation();
      if (confirmSecret !== "" || confirmSecret !== false) {
        logIn(confirmSecret);
      } else {
        Alert.alert("Wrong secret!");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Wrong secret!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...confirmInput}
          placeholder={"Secret"}
          onSubmitEditing={handleConfirm}
          disabled={loading}
        />
        <AuthButton text="Confirm" onPress={handleConfirm} loading={loading} />
        <TextLink
          text="Don't have an account?"
          onPress={() => navigation.navigate("Signup")}
          style={{ "margin-top": "25px" }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
