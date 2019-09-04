import {
    createStackNavigator,
    createSwitchNavigator,
    createAppContainer
} from "react-navigation";
import Splash from "../screens/Splash";
import Home from "../screens/Home";

const RootSwitch = createSwitchNavigator(
    { Splash, Home },
    { initialRouteName: "Splash" }
);

const AppContainer = createAppContainer(RootSwitch);
export default AppContainer;
