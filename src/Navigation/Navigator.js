import {
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
    LoginScreen,
    RegistrationScreen,
    HomeScreen,
} from '../Components';
import {routes} from '../Constants';
import BaseScreen from '../Components/BaseScreen';

const LoginAppNavigator = createStackNavigator({
    [routes.LoginScreen]: LoginScreen,
    [routes.SignUpScreen]: RegistrationScreen,
}, {
    headerMode: 'none',
});

const HomeAppNavigator = createStackNavigator({
    [routes.HomeScreen]: HomeScreen,
}, {
    headerMode: 'none',
});

const MainAppNavigator = createSwitchNavigator({
    [routes.HomeAppNavigator]: HomeAppNavigator,
    [routes.LoginAppNavigator]: LoginAppNavigator,
    [routes.BaseScreen]: BaseScreen,
}, {
    initialRouteName: routes.BaseScreen,
    defaultNavigationOptions: {
        gesturesEnabled: false,
    },
});

export default createAppContainer(MainAppNavigator);
