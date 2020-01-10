import { Foundation, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import { ApolloProvider } from "react-apollo-hooks";
import { AsyncStorage } from "react-native";
import { ThemeProvider } from "styled-components";

import apolloClientOptions from "./Apollo";
import { AuthProvider } from "./AuthContext";
import NavController from "./components/NavController";
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
        ...SimpleLineIcons.font,
        ...Foundation.font,
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

      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");

      setIsLoggedIn(isLoggedIn === "true");
      setLoaded(true);
      setClient(client);
    } catch (error) {
      console.log(error);
    }
  };

  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <NavController />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
