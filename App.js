import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { AsyncStorage, Text, TouchableOpacity, View } from "react-native";
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

  useEffect(() => {
    preLoad();
  }, []);

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

      setIsLoggedIn((await AsyncStorage.getItem("isLoggedIn")) === "true");

      setLoaded(true);
      setClient(client);
    } catch (error) {
      console.log(error);
    }
  };

  const logUserIn = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logUserOut = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {isLoggedIn === true ? (
            <TouchableOpacity onPress={logUserOut}>
              <Text>Log Out</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={logUserIn}>
              <Text>Log In</Text>
            </TouchableOpacity>
          )}
        </View>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
