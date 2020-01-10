import React, { useState } from "react";
import { useQuery } from "react-apollo-hooks";
import { RefreshControl, ScrollView } from "react-native";
import styled from "styled-components";

import Loader from "../../components/Loader";
import Post from "../../components/Post";
import { FEED_QUERY } from "../../queries/FeedQueires";

const View = styled.ScrollView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const Text = styled.Text``;

export default () => {
  const [refreshing, setRefreshing] = useState(false);

  const { loading, data, refetch } = useQuery(FEED_QUERY);

  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch ({ message }) {
      console.log(message);
    } finally {
      setRefreshing(false);
    }
  };
  console.log(loading, data);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
      style={{ backgroundColor: "white" }}
    >
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.seeFeed &&
        data.seeFeed.map(post => <Post key={post.id} {...post} />)
      )}
    </ScrollView>
  );
};
