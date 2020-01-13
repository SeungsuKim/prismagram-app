import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import constants from "../constants";
import theme from "../Styles";
import { IonIcon } from "./NavIcon";

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const SearchIcon = styled.View`
  position: absolute;
  z-index: 1;
  left: 10px;
`;

const TextInput = styled.TextInput`
  width: ${constants.width - 20};
  background-color: ${theme.lightGreyColor};
  padding: 6px;
  padding-left: 35px;
  border-radius: 10px;
  text-align: left;
`;

const SearchBar = ({ value, onChange, onSubmit }) => (
  <Container>
    <SearchIcon>
      <IonIcon name={"ios-search"} color={theme.darkGreyColor} size={20} />
    </SearchIcon>

    <TextInput
      value={value}
      placeholder={"Search"}
      onChangeText={onChange}
      onSubmitEditing={onSubmit}
      returnKeyType="search"
      placeholderTextColor={theme.darkGreyColor}
    />
  </Container>
);

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default SearchBar;
