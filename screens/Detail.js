import React from "react";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";

import Loader from "../components/Loader";
import Post from "../components/Post";
import { POST_DETAIL } from "../queries/PostQueires";

const ScrollView = styled.ScrollView`
  background-color: white;
  flex: 1;
`;

export default ({ navigation }) => {
  const { loading, data } = useQuery(POST_DETAIL, {
    variables: { id: navigation.getParam("id") }
  });

  console.log(loading, data);

  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data && data.seeFullPost && <Post {...data.seeFullPost} />
      )}
    </ScrollView>
  );
};
