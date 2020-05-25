import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {DrawerActions} from 'react-navigation-drawer';
import { TabView, TabBar } from 'react-native-tab-view';
import {AppNavigationBar, AppTouchableIcon} from '../UIKit';
import CurrentProjectsScreen from './CurrentProjectsScreen';
import PendingProjectsScreen from './PendingProjectsScreen';
import {routes} from '../../Constants';

class ProjectsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                {key: 'current', title: 'Текущие проекты'},
                {key: 'pending', title: 'Ожидающие проекты'},
            ],
        };
    }

    _onMenuPress = () => {
        this.props.navigation.dispatch(DrawerActions.openDrawer());
    };

    _onAddProjectPress = () => {
        this.props.navigation.navigate(routes.AddProjectScreen);
    };

    _renderScene = ({ route }) => {
        switch (route.key) {
        case 'current':
            return <CurrentProjectsScreen navigation={this.props.navigation} />;
        case 'pending':
            return <PendingProjectsScreen />;
        default:
            return null;
        }
    };

    _renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: '#03bafc' }}
        />
    );

    render() {
        return (
            <View style={{flex: 1,}}>
                <AppNavigationBar style={styles.navigationBar}>
                    <AppTouchableIcon
                        style={styles.menuIcon}
                        icon="ios-menu"
                        onPress={this._onMenuPress}
                    />
                    <Text style={styles.title}>
                        Projects
                    </Text>
                    <View style={styles.flexSpacing} />
                    <AppTouchableIcon
                        style={styles.addIcon}
                        icon="ios-add"
                        onPress={this._onAddProjectPress}
                        fontSize={40}
                    />
                </AppNavigationBar>
                <TabView
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    onIndexChange={(index) => this.setState({ index })}
                    initialLayout={{width: Dimensions.get('window').width}}
                    style={{width: '100%'}}
                    renderTabBar={this._renderTabBar}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navigationBar: {
        width: '100%',
    },
    scene: {
        flex: 1,
    },
    title: {
        marginLeft: 20,
        fontSize: 17,
        letterSpacing: 0.15,
        color: '#FFF',
    },
    menuIcon: {

    },
    addIcon: {
        paddingHorizontal: 16,
    },
    flexSpacing: {
        flex: 1,
    },
});

export default ProjectsScreen;
