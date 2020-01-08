import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useIsLoggedIn, useLogIn, useLogOut } from "../AuthContext";
import AuthNavigation from "../navigations/AuthNavigation";

export default () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <View style={{ flex: 1 }}>
      {isLoggedIn ? <Text>Log Out</Text> : <AuthNavigation />}
    </View>
  );
};
