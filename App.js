import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { AsyncStorage, Text, View } from "react-native";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";
import { ThemeProvider } from "styled-components";

import apolloClientOptions from "./Apollo";
import styles from "./Styles";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const preLoad = async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font
      });

      await Asset.loadAsync(require("./assets/logo.svg"));

      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage
      });

      const client = new ApolloClient({
        cache,
        ...apolloClientOptions
      });

      setIsLoggedIn((await AsyncStorage.getItem("isLoggedIn")) === true);

      setLoaded(true);
      setClient(client);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <View>
          {isLoggedIn === true ? <Text>I'm in</Text> : <Text>I'm out</Text>}
        </View>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
