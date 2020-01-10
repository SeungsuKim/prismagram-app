import React from "react";
import { Text, View } from "react-native";

export default ({ navigation }) => (
  <View>
    <Text>Detail {navigation.getParam("id")}</Text>
  </View>
);
