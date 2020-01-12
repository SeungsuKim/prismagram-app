import React from "react";
import { Image, View } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import MessagesLink from "../components/MessagesLink";
import { FeatherIcon, IonIcon, SimpleLineIcon } from "../components/NavIcon";
import NavIcon from "../components/NavIcon";
import Detail from "../screens/Detail";
import Home from "../screens/Tabs/Home";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import Search from "../screens/Tabs/Search";
import theme from "../Styles";

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator(
    {
      InitialRoute: {
        screen: initialRoute,
        navigationOptions: {
          ...customConfig
        }
      },
      Detail: {
        screen: Detail,
        navigationOptions: {
          headerTintColor: theme.blackColor,
          title: "Photo"
        }
      }
    },
    {
      defaultNavigationOptions: {
        headerStyle: { backgroundColor: theme.backgroundColor }
      }
    }
  );

export default createBottomTabNavigator(
  {
    Home: {
      screen: stackFactory(Home, {
        headerRight: () => <MessagesLink />,
        headerTitle: () => (
          <Image
            source={require("../assets/cursive-logo.png")}
            style={{ height: 30 }}
            resizeMode="contain"
          />
        )
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <FeatherIcon name={"home"} size={27} focused={focused} />
        )
      }
    },
    Search: {
      screen: stackFactory(Search, {
        headerBackTitle: null
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
      screen: stackFactory(Notifications, {
        title: "Notifications"
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <IonIcon name={"ios-heart-empty"} size={30} focused={focused} />
        )
      }
    },
    Profile: {
      screen: stackFactory(Profile, {
        title: "Profile"
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <SimpleLineIcon name={"user"} size={25} focused={focused} />
        )
      }
    }
  },
  {
    initialRouteName: "Search",
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: theme.backgroundColor
      }
    }
  }
);
