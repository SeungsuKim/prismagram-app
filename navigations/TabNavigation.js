import React from "react";
import { Image } from "react-native";
import { View } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import MessagesLink from "../components/MessagesLink";
import { FeatherIcon, IonIcon, SimpleLineIcon } from "../components/NavIcon";
import Home from "../screens/Tabs/Home";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import Search from "../screens/Tabs/Search";
import theme from "../Styles";

export default createBottomTabNavigator(
  {
    Home: {
      screen: createStackNavigator({
        Home: {
          screen: Home,
          navigationOptions: {
            headerRight: () => <MessagesLink />,
            headerTitle: () => (
              <Image
                source={require("../assets/cursive-logo.png")}
                style={{ height: 30 }}
                resizeMode="contain"
              />
            ),
            headerStyle: { backgroundColor: theme.backgroundColor }
          }
        }
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <FeatherIcon name={"home"} size={27} focused={focused} />
        )
      }
    },
    Search: {
      screen: createStackNavigator({
        Search: {
          screen: Search,
          navigationOptions: {
            headerStyle: { backgroundColor: theme.backgroundColor }
          }
        }
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <IonIcon name={"ios-search"} size={30} focused={focused} />
        )
      }
    },
    Add: {
      screen: View,
      navigationOptions: {
        tabBarOnPress: ({ navigation }) =>
          navigation.navigate("PhotoNavigation"),
        tabBarIcon: ({ focused }) => (
          <IonIcon
            name={"ios-add-circle-outline"}
            size={30}
            focused={focused}
          />
        )
      }
    },
    Notifications: {
      screen: createStackNavigator({
        Notifications: {
          screen: Notifications,
          navigationOptions: {
            headerStyle: { backgroundColor: theme.backgroundColor }
          }
        }
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <IonIcon name={"ios-heart-empty"} size={30} focused={focused} />
        )
      }
    },
    Profile: {
      screen: createStackNavigator({
        Profile: {
          screen: Profile,
          navigationOptions: {
            headerStyle: { backgroundColor: theme.backgroundColor }
          }
        }
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <SimpleLineIcon name={"user"} size={25} focused={focused} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: { backgroundColor: theme.backgroundColor }
    }
  }
);
