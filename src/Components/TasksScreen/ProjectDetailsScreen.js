import React, {Component} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import {AppNavigationBar, AppTouchableIcon} from '../UIKit';
import routes from '../../Constants/routes';
import TasksScreen from './TasksScreen';
import MembersScreen from './MembersScreen';

class ProjectDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                {key: 'tasks', title: 'Задачи'},
                {key: 'members', title: 'Участники'},
            ],
            title: '',
        };
    }

    _renderScene = ({ route }) => {
        switch (route.key) {
        case 'tasks':
            return <TasksScreen navigation={this.props.navigation} />;
        case 'members':
            return <MembersScreen navigation={this.props.navigation} />;
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
        const {project} = this.props.navigation.state.params;
        return (
            <View style={{flex: 1}}>
                <AppNavigationBar style={styles.navigationBar}>
                    <AppTouchableIcon
                        style={styles.menuIcon}
                        icon="ios-arrow-back"
                        onPress={() => this.props.navigation.navigate(routes.ProjectsScreen)}
                    />
                    <Text style={styles.title}>
                        Проект: {project.title}
                    </Text>
                    <View style={styles.flexSpacing} />
                    <AppTouchableIcon
                        style={styles.addIcon}
                        icon="ios-cog"
                        onPress={() => this.props.navigation.navigate(routes.EditProjectScreen, {project})}
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
    contentContainer: {

        alignItems: 'center',
    },
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

export default ProjectDetailsScreen;
