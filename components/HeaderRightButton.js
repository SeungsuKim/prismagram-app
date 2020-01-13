import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import theme from "../Styles";

const Touchable = styled.TouchableOpacity``;

const Button = styled.View`
  padding-right: 10px;
  ${props => props.style}
`;

const Text = styled.Text`
  color: ${theme.blueColor};
  font-weight: 600;
  font-size: 16px;
`;

const HeaderRightButton = ({ text, onPress, style }) => (
  <Touchable onPress={onPress}>
    <Button style={style}>
      <Text>{text}</Text>
    </Button>
  </Touchable>
);

HeaderRightButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default HeaderRightButton;
