import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const TextInput = styled.TextInput``;

const SearchBar = ({ value, onChange, onSubmit }) => (
  <TextInput value={value} placeholder={"Search"} />
);

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default SearchBar;
