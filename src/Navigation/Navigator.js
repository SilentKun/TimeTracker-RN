import {
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {
    LoginScreen,
    RegistrationScreen,
    ProjectsScreen,
} from '../Components';
import {routes} from '../Constants';
import BaseScreen from '../Components/BaseScreen';

const LoginStack = createStackNavigator({
    [routes.LoginScreen]: LoginScreen,
    [routes.RegistrationScreen]: RegistrationScreen,
}, {
    headerMode: 'none',
});

const HomeStack = createStackNavigator({
    [routes.ProjectsScreen]: ProjectsScreen,
}, {
    headerMode: 'none',
});

const DrawerNavigator = createDrawerNavigator({
    [routes.HomeNavigator]: HomeStack,
}, {
    initialRouteName: routes.HomeNavigator,
});

const MainAppNavigator = createStackNavigator({
    [routes.MainAppDrawer]: DrawerNavigator,
}, {
    initialRouteName: routes.MainAppDrawer,
    headerMode: 'none',
});

const MainNavigator = createSwitchNavigator({
    [routes.MainAppContent]: MainAppNavigator,
    [routes.LoginNavigator]: LoginStack,
    [routes.BaseScreen]: BaseScreen,
}, {
    initialRouteName: routes.BaseScreen,
    defaultNavigationOptions: {
        gesturesEnabled: true,
    },
});

export default createAppContainer(MainNavigator);
