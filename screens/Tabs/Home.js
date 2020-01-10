import React from "react";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";

import Loader from "../../components/Loader";
import { FEED_QUERY } from "../../queries/FeedQueires";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const Text = styled.Text``;

export default () => {
  const { loading, data } = useQuery(FEED_QUERY);
  console.log(loading, data);
  return <View>{loading ? <Loader /> : <Text>Home</Text>}</View>;
};
