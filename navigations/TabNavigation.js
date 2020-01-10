import React from "react";
import { Image } from "react-native";
import { View } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import MessagesLink from "../components/MessagesLink";
import { FoundationIcon, IonIcon, SimpleLineIcon } from "../components/NavIcon";
import Home from "../screens/Tabs/Home";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import Search from "../screens/Tabs/Search";

export default createBottomTabNavigator(
  {
    Home: {
      screen: createStackNavigator({
        Home: {
          screen: Home,
          navigationOptions: {
            headerRight: () => <MessagesLink />,
            headerTitle: (
              <Image
                source={require("../assets/cursive-logo.png")}
                style={{ height: 40 }}
                resizeMode="contain"
              />
            )
          }
        }
      }),
      navigationOptions: {
        tabBarIcon: <FoundationIcon name={"home"} size={30} />
      }
    },
    Search: {
      screen: createStackNavigator({ Search }),
      navigationOptions: {
        tabBarIcon: <IonIcon name={"ios-search"} size={30} />
      }
    },
    Add: {
      screen: View,
      navigationOptions: {
        tabBarOnPress: ({ navigation }) =>
          navigation.navigate("PhotoNavigation"),
        tabBarIcon: <IonIcon name={"ios-add-circle-outline"} size={30} />
      }
    },
    Notifications: {
      screen: createStackNavigator({ Notifications }),
      navigationOptions: {
        tabBarIcon: <IonIcon name={"ios-heart-empty"} size={30} />
      }
    },
    Profile: {
      screen: createStackNavigator({ Profile }),
      navigationOptions: {
        tabBarIcon: <SimpleLineIcon name={"user"} size={30} />
      }
    }
  },
  { tabBarOptions: { showLabel: false } }
);
