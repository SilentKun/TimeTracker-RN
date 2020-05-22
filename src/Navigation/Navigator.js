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
    ProjectDetailsScreen,
} from '../Components';
import SideMenu from './SideMenu';
import {routes} from '../Constants';
import BaseScreen from '../Components/BaseScreen';
import AddProjectScreen from '../Components/ProjectsScreen/AddProjectScreen';
import EditProjectScreen from '../Components/TasksScreen/EditProjectScreen';

const LoginStack = createStackNavigator({
    [routes.LoginScreen]: LoginScreen,
    [routes.RegistrationScreen]: RegistrationScreen,
}, {
    headerMode: 'none',
});

const TasksStack = createStackNavigator({
    [routes.TasksScreen]: ProjectDetailsScreen,
    [routes.EditProjectScreen]: EditProjectScreen,
}, {
    headerMode: 'none',
});

const HomeStack = createStackNavigator({
    [routes.ProjectsScreen]: ProjectsScreen,
    [routes.AddProjectScreen]: AddProjectScreen,
    [routes.TasksStack]: TasksStack,
}, {
    headerMode: 'none',
});

const DrawerNavigator = createDrawerNavigator({
    [routes.HomeStack]: HomeStack,
}, {
    initialRouteName: routes.HomeStack,
    contentComponent: SideMenu,
});

const MainAppNavigator = createStackNavigator({
    [routes.MainAppDrawer]: DrawerNavigator,
}, {
    initialRouteName: routes.MainAppDrawer,
    headerMode: 'none',
});

const MainNavigator = createSwitchNavigator({
    [routes.MainAppContent]: MainAppNavigator,
    [routes.LoginStack]: LoginStack,
    [routes.BaseScreen]: BaseScreen,
}, {
    initialRouteName: routes.BaseScreen,
    defaultNavigationOptions: {
        gesturesEnabled: true,
    },
});

export default createAppContainer(MainNavigator);
