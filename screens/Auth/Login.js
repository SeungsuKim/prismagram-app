import React from "react";
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
  const handleLogin = () => {};

  return (
    <View>
      <AuthInput
        {...emailInput}
        placeholder={"Email"}
        keyboardType={"email-address"}
      />
      <AuthButton text="Log In" onPress={() => null} />
    </View>
  );
};
