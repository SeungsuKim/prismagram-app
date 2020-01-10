import React from "react";
import { withNavigation } from "react-navigation";
import styled from "styled-components";

import theme from "../Styles";
import { SimpleLineIcon } from "./NavIcon";

const Container = styled.TouchableOpacity`
  padding-right: 10px;
`;

export default withNavigation(({ navigation }) => (
  <Container onPress={() => navigation.navigate("MessageNavigation")}>
    <SimpleLineIcon name={"paper-plane"} />
  </Container>
));
