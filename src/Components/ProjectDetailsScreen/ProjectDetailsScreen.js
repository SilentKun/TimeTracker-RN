import React, {Component} from 'react';
import {StyleSheet, View, Text, Dimensions, KeyboardAvoidingView} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationEvents} from 'react-navigation';
import {AppNavigationBar, AppTouchableIcon} from '../UIKit';
import routes from '../../Constants/routes';
import TasksScreen from './TasksScreen';
import MembersScreen from './MembersScreen';
import {loadTasks} from '../../Networking';
import {colors} from '../../Constants';

class ProjectDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                {key: 'tasks', title: 'Задачи'},
                {key: 'members', title: 'Участники'},
            ],
        };
    }

    componentDidMount() {
        this._loadTasks();
    }

    _loadTasks = () => {
        const {project} = this.props.navigation.state?.params;
        loadTasks(project.id, (error, response) => {
            if (error) {
                alert(error);
            } else {
                this.setState({isAdmin: response.caller.right.Id !== 1, project: response.project});
            }
        });
    };

    _renderScene = ({ route }) => {
        switch (route.key) {
        case 'tasks':
            return <TasksScreen navigation={this.props.navigation} />;
        case 'members':
            return <MembersScreen isAdmin={this.state.isAdmin} navigation={this.props.navigation} />;
        default:
            return null;
        }
    };

    _renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: '#03bafc' }}
            renderIcon={({ route, focused, color }) => (
                <Icon
                    name={route.key === 'tasks' ? 'ios-paper' : 'md-people'}
                    size={25}
                    color={color}
                />
            )}
        />
    );

    render() {
        const {project} = this.state;
        return (
            <View style={{flex: 1, backgroundColor: colors.feedBackground}}>
                <NavigationEvents
                    onWillFocus={() => {
                        this._loadTasks();
                    }}
                />
                <AppNavigationBar style={styles.navigationBar}>
                    <AppTouchableIcon
                        style={styles.menuIcon}
                        icon="ios-arrow-back"
                        onPress={() => this.props.navigation.navigate(routes.ProjectsScreen)}
                    />
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
                        Проект: {project?.Title}
                    </Text>
                    <View style={styles.flexSpacing} />
                    {this.state.isAdmin &&
                    <AppTouchableIcon
                        style={styles.addIcon}
                        fontSize={28}
                        icon="md-create"
                        onPress={() => this.props.navigation.navigate(routes.EditProjectScreen, {project})}
                    />}
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
        width: '70%',
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
