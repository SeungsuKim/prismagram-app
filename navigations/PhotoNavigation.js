import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import theme from "../Styles";

const PhotoTabs = createMaterialTopTabNavigator(
  {
    SelectPhoto: {
      screen: SelectPhoto,
      navigationOptions: {
        tabBarLabel: "Select"
      }
    },
    TakePhoto: {
      screen: TakePhoto,
      navigationOptions: {
        tabBarLabel: "Take"
      }
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

export default createStackNavigator(
  {
    PhotoTabs: {
      screen: PhotoTabs,
      navigationOptions: {}
    },
    UploadPhoto
  },
  {
    defaultNavigationOptions: {
      headerStyle: { backgroundColor: theme.backgroundColor }
    }
  }
);
