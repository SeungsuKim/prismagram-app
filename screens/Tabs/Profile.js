import React from "react";
import { useQuery } from "react-apollo-hooks";
import { ScrollView } from "react-native";
import styled from "styled-components";

import Loader from "../../components/Loader";
import UserProfile from "../../components/UserProfile";
import { ME } from "../../queries/ProfileQueries";

export default () => {
  const { loading, data } = useQuery(ME);

  console.log(loading, data);

  return (
    <ScrollView>
      {loading ? <Loader /> : data && data.me && <UserProfile {...data.me} />}
    </ScrollView>
  );
};
