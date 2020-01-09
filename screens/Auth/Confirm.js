import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
import Divider from "react-native-divider";
import styled from "styled-components";

import theme from ".././../Styles";
import { useLogIn } from "../../AuthContext";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import TextLink from "../../components/TextLink";
import constants from "../../constants";
import useInput from "../../hooks/useInput";
import { CONFIRM_SECRET } from "../../queries/AuthQueries";

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
        <Image
          width={constants.width / 2}
          source={require("../../assets/cursive-logo.png")}
        />
        <Controls>
          <AuthInput
            {...confirmInput}
            placeholder={"Secret"}
            onSubmitEditing={handleConfirm}
            disabled={loading}
          />
          <AuthButton
            text="Confirm"
            onPress={handleConfirm}
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
            onPress={() => navigation.navigate("Signup")}
          />
        </Controls>
      </View>
    </TouchableWithoutFeedback>
  );
};
