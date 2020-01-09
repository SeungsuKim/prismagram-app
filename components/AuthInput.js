import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import constants from "../constants";

const Container = styled.View`
  margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
  width: ${constants.width / 2};
  padding: 10px;
  background-color: ${props => props.theme.greyColor};
  border: 1px solid ${props => props.theme.darkGreyColor};
  border-radius: 4px;
`;

const AuthInput = ({
  placeholder,
  value,
  onChage,
  keyboardType = "default",
  autoCapitalize = "none"
}) => (
  <Container>
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChage}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
    />
  </Container>
);

AuthInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChage: PropTypes.func.isRequired,
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address"
  ]),
  autoCapitalize: PropTypes.oneOf(["one", "sentences", "words", "characters"])
};

export default AuthInput;
