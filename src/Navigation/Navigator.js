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
import EditProjectScreen from '../Components/ProjectDetailsScreen/EditProjectScreen';
import TaskDetailsScreen from '../Components/TaskDetailsScreen';
import UserPageScreen from '../Components/UserPageScreen';

const LoginStack = createStackNavigator({
    [routes.LoginScreen]: LoginScreen,
    [routes.RegistrationScreen]: RegistrationScreen,
}, {
    headerMode: 'none',
});

const TaskDetailsStack = createStackNavigator({
    [routes.TaskDetailsScreen]: TaskDetailsScreen,
    // [routes.EditTaskScreen]: EditTaskScreen,
}, {
    headerMode: 'none',
});

const ProjectDetailsStack = createStackNavigator({
    [routes.ProjectDetailsScreen]: ProjectDetailsScreen,
    [routes.EditProjectScreen]: EditProjectScreen,
    [routes.TaskDetailsStack]: TaskDetailsStack,
}, {
    headerMode: 'none',
});

const HomeStack = createStackNavigator({
    [routes.ProjectsScreen]: ProjectsScreen,
    [routes.AddProjectScreen]: AddProjectScreen,
    [routes.ProjectDetailsStack]: ProjectDetailsStack,
}, {
    headerMode: 'none',
});

const DrawerNavigator = createDrawerNavigator({
    [routes.HomeStack]: HomeStack,
    [routes.UserPageScreen]: UserPageScreen,
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
