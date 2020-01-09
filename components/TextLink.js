import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Touchable = styled.TouchableOpacity``;

const Link = styled.View`
  ${props => props.style}
`;

const Text = styled.Text`
  color: ${props => props.theme.blueColor};
  font-weight: 600;
  text-align: center;
`;

const TextLink = ({ text, onPress, style }) => (
  <Touchable onPress={onPress}>
    <Link style={style}>
      <Text>{text}</Text>
    </Link>
  </Touchable>
);

TextLink.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default TextLink;
