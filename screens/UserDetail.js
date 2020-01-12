import React from "react";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";

import Loader from "../components/Loader";
import UserProfile from "../components/UserProfile";
import { GET_USER } from "../queries/ProfileQueries";

const ScrollView = styled.ScrollView`
  background-color: white;
  flex: 1;
`;

export default ({ navigation }) => {
  const { loading, data } = useQuery(GET_USER, {
    variables: { username: navigation.getParam("username") }
  });

  console.log(loading, data);

  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data && data.seeUser && <UserProfile {...data.seeUser} />
      )}
    </ScrollView>
  );
};
