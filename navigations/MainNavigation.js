import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import theme from "../Styles";
import MessageNavigation from "./MessageNavigation";
import PhotoNavigation from "./PhotoNavigation";
import TabNavigation from "./TabNavigation";

const MainNavigation = createStackNavigator(
  {
    TabNavigation,
    PhotoNavigation,
    MessageNavigation
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: theme.backgroundColor
      }
    },
    headerMode: "none",
    mode: "modal"
  }
);

export default createAppContainer(MainNavigation);
