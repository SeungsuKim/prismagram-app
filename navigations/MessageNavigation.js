import { createStackNavigator } from "react-navigation-stack";

import Message from "../screens/Messages/Message";
import Messages from "../screens/Messages/Messages";
import theme from "../Styles";

export default createStackNavigator(
  {
    Messages,
    Message
  },
  {
    defaultNavigationOptions: {
      headerStyle: { backgroundColor: theme.backgroundColor }
    }
  }
);
