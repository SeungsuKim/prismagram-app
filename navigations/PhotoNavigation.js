import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import theme from "../Styles";

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator(
    {
      InitialRoute: {
        screen: initialRoute,
        navigationOptions: { ...customConfig }
      },
      UploadPhoto: {
        screen: UploadPhoto,
        navigationOptions: {
          title: "New Post"
        }
      }
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: theme.backgroundColor
        },
        headerTintColor: theme.blackColor,
        headerBackTitleVisible: false
      }
    }
  );

export default createMaterialTopTabNavigator(
  {
    SelectPhoto: {
      screen: stackFactory(SelectPhoto, { title: "Choose Photo" }),
      navigationOptions: { tabBarLabel: "Select" }
    },
    TakePhoto: {
      screen: stackFactory(TakePhoto, { title: "Take Photo" }),
      navigationOptions: { tabBarLabel: "Take" }
    }
  },
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      style: {
        backgroundColor: theme.backgroundColor
      },
      labelStyle: {
        fontWeight: "600",
        paddingBottom: 30
      },
      activeTintColor: theme.blackColor,
      inactiveTintColor: theme.darkGreyColor,
      pressColor: theme.backgroundColor,
      renderIndicator: () => null
    }
  }
);
