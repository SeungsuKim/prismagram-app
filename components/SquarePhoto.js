import PropTypes from "prop-types";
import React from "react";
import { withNavigation } from "react-navigation";
import styled from "styled-components";

import constants from "../constants";

const Touchable = styled.TouchableOpacity``;

const Image = styled.Image`
  width: ${constants.width / 3};
  height: ${constants.width / 3};
`;

const SquarePhoto = ({ navigation, files = [], id }) => (
  <Touchable onPress={() => navigation.navigate("Detail", { id })}>
    <Image source={{ uri: files[0].url }} />
  </Touchable>
);

SquarePhoto.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  id: PropTypes.string.isRequired
};

export default withNavigation(SquarePhoto);
