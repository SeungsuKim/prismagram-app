import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.View`
  margin-bottom: 10px;
  border-width: 1px;
`;

const TextInput = styled.TextInput``;

const AuthInput = ({
  placeholder,
  value,
  keyboardType = "default",
  autoCapitalize = false
}) => (
  <Container>
    <TextInput
      placeholder={placeholder}
      value={value}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
    />
  </Container>
);

AuthInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address"
  ]),
  autoCapitalize: PropTypes.bool
};

export default AuthInput;
