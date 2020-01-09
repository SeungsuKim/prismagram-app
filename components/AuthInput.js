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
  onSubmitEditing,
  keyboardType = "default",
  autoCapitalize = "none",
  returnKeyType = "done",
  autoCorrect = false,
  disabled = false
}) => (
  <Container>
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChage}
      onSubmitEditing={onSubmitEditing}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      returnKeyType={returnKeyType}
      autoCorrect={autoCorrect}
      editable={!disabled}
      selectTextOnFocus={!disabled}
    />
  </Container>
);

AuthInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChage: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func,
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address"
  ]),
  autoCapitalize: PropTypes.oneOf(["one", "sentences", "words", "characters"]),
  returnKeyType: PropTypes.oneOf(["go", "next", "search", "send", "done"]),
  autoCorrect: PropTypes.bool,
  disabled: PropTypes.bool
};

export default AuthInput;
