import {
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {connect} from 'react-redux';
import React from 'react';
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {
    LoginScreen,
    RegistrationScreen,
    ProjectsScreen,
    ProjectDetailsScreen,
} from '../Components';
import SideMenu from './SideMenu';
import {colors, routes} from '../Constants';
import {AppSafeAreaView} from '../Components/UIKit';
import BaseScreen from '../Components/BaseScreen';
import AddProjectScreen from '../Components/ProjectsScreen/AddProjectScreen';
import EditProjectScreen from '../Components/ProjectDetailsScreen/EditProjectScreen';
import TaskDetailsScreen from '../Components/TaskDetailsScreen';
import UserPageScreen from '../Components/UserPageScreen';
import TaskTrackingScreen from '../Components/TaskTrackingScreen/TaskTrackingScreen';
import EditTaskScreen from '../Components/TaskDetailsScreen/EditTaskScreen';
import ReportsScreen from '../Components/ReportsScreen/ReportsScreen';

const LoginStack = createStackNavigator({
    [routes.LoginScreen]: LoginScreen,
    [routes.RegistrationScreen]: RegistrationScreen,
}, {
    headerMode: 'none',
});

const TaskDetailsStack = createStackNavigator({
    [routes.TaskDetailsScreen]: TaskDetailsScreen,
    [routes.EditTaskScreen]: EditTaskScreen,
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
    [routes.ReportsScreen]: ReportsScreen,
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

class MainNavigatorWithCustomView extends React.Component {
    static router = MainNavigator.router;

    render() {
        const {isTracking, task} = this.props;
        return (
            <View style={{flex: 1, backgroundColor: colors.feedBackground}}>
                <MainNavigator {...this.props} />
                {isTracking &&
                <TaskTrackingScreen task={task} />}
                <AppSafeAreaView onlyBottom={true} />
            </View>
        );
    }
}

const AppContainer = createAppContainer(MainNavigatorWithCustomView);

const mapStateToProps = ({isTracking, task}) => {
    return {
        isTracking,
        task,
    };
};

export default connect(mapStateToProps, null)(AppContainer);
