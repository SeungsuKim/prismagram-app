import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components";

import theme from "../Styles.js";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export default () => (
  <Container>
    <ActivityIndicator white={theme.blackColor} />
  </Container>
);
