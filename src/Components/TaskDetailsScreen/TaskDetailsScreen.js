import React, {Component} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import moment from 'moment';
import {AppNavigationBar, AppTouchableIcon, WorktrackCell} from '../UIKit';
import {colors, routes} from '../../Constants';
import TaskHeader from './TaskHeader';
import {loadWorktracks, loadWorkTask, loadTaskStates, updateTaskState} from '../../Networking';

class TaskDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            worktracks: [],
            worktask: {},
            taskStates: [],
            project: {},
            loading: true,
            value: null,
        };
    }

    componentDidMount() {
        this._loadWorktracks();
        this._loadTask();
        this._loadStates();
    }

    _renderItem = ({item}) => {
        return (
            <WorktrackCell
                key={item.id}
                {...item}
            />
        );
    };

    _onStateChange = (value) => {
        this.setState({value})
        updateTaskState({
            taskId: this.state.worktask.Id.toString(),
            stateId: value.toString(),
        }, (error, response) => {
            if (error) {
                alert(error);
            } else {
            }
        });
    };

    _renderHeader = () => {
        return (
            <TaskHeader
                valueTask={this.state.value}
                states={this.state.taskStates}
                worktask={this.state.worktask}
                project={this.state.project}
                onValueChange={this._onStateChange}
            />
        );
    };

    _loadWorktracks = () => {
        const {task} = this.props.navigation.state?.params;
        loadWorktracks(task.Id, (error, worktracks) => {
            if (error) {
                this.setState({loading: false});
                alert(error);
            } else {
                this.setState({worktracks, loading: false});
            }
        });
    };

    _loadTask = () => {
        const {task} = this.props.navigation.state?.params;
        loadWorkTask(task.Id, (error, response) => {
            if (error) {
                this.setState({loading: false});
                alert(error);
            } else {
                this.setState({
                    worktask: response.worktask,
                    project: response.project,
                    isAdmin: response.isAdmin,
                    loading: false,
                    value: response.worktask.StateId,
                });
            }
        });
    };

    _loadStates = () => {
        loadTaskStates((error, response) => {
            if (error) {
                this.setState({loading: false});
                alert(error);
            } else {
                const taskStates = response.states.map((state) => {
                    return {
                        value: state.Id,
                        label: state.Title,
                    };
                });
                this.setState({taskStates, loading: false});
            }
        });
    };

    render() {
        const {worktracks, loading, worktask} = this.state;
        return (
            <View style={{flex: 1, backgroundColor: colors.feedBackground}}>
                <AppNavigationBar style={styles.navigationBar}>
                    <AppTouchableIcon
                        style={styles.menuIcon}
                        icon="ios-arrow-back"
                        onPress={() => this.props.navigation.navigate(routes.ProjectDetailsScreen)}
                    />
                    <Text style={styles.title}>
                        Задача: {worktask.Title}
                    </Text>
                    <View style={styles.flexSpacing} />
                    <AppTouchableIcon
                        style={styles.addIcon}
                        fontSize={28}
                        icon="md-create"
                        onPress={this._onAddProjectPress}
                    />
                </AppNavigationBar>
                <FlatList
                    style={styles.container}
                    ListHeaderComponentStyle={styles.listHeaderComponent}
                    ListHeaderComponent={this._renderHeader}
                    contentContainerStyle={styles.contentContainer}
                    data={worktracks}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderItem}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={this._loadWorktracks} />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    },
    listHeaderComponent: {
        // height: '20%',
        marginHorizontal: 10,
        marginTop: 10,
    },
    contentContainer: {
        paddingBottom: 30,

    },
    flexSpacing: {
        flex: 1,
    },
    addIcon: {
        paddingHorizontal: 16,
    },
    title: {
        marginLeft: 20,
        fontSize: 17,
        letterSpacing: 0.15,
        color: '#FFF',
        width: '70%',
    },
});

export default TaskDetailsScreen;
