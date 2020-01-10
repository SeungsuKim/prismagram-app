import PropTypes from "prop-types";
import React, { useState } from "react";
import { useQuery } from "react-apollo-hooks";
import { RefreshControl, ScrollView } from "react-native";
import styled from "styled-components";

import { SEARCH } from "../../../queries/SearchQueries";

const SearchPresenter = ({ term, shouldFetch }) => {
  const [refreshing, setRefreshing] = useState(false);

  const { data, loading, refetch } = useQuery(SEARCH, {
    variables: {
      term
    },
    skip: !shouldFetch
  });

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      refetch({ variables: { term } });
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{ backgroundColor: "white" }}
    ></ScrollView>
  );
};

SearchPresenter.propTypes = {
  term: PropTypes.string.isRequired,
  shouldFetch: PropTypes.bool.isRequired
};

export default SearchPresenter;
