import React, {Component} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import moment from 'moment';
import {AppNavigationBar, AppTouchableIcon, WorktrackCell} from '../UIKit';
import {colors, routes} from '../../Constants';
import TaskHeader from './TaskHeader';
import {loadWorktracks, loadWorkTask, loadTaskStates, updateTaskState} from '../../Networking';

const offset = moment().utcOffset();

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
            taskLoading: true,
        };
        this.createdDate = null
    }

    componentDidMount() {
        this._loadWorktracks();
        this._loadTask();
    }

    _renderItem = ({item}) => {
        const startedTime = moment(item.StartedTime).add(offset, 'm').format('HH:mm:ss');
        const stoppedTime = moment(item.StoppedTime).add(offset, 'm').format('HH:mm:ss');
        return (
            <WorktrackCell
                startedTime={startedTime}
                stoppedTime={stoppedTime}
                key={item.id}
                {...item}
            />
        );
    };

    _onStateChange = (value) => {
        this.setState({value});

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
        const {worktask, taskLoading} = this.state
        const createdDate = moment(worktask.CreatedDate).add(offset, 'm').format('L');

        return (
            <TaskHeader
                valueTask={this.state.value}
                states={this.state.taskStates}
                createdDate={createdDate}
                worktask={worktask}
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
                this._loadStates();
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
                this.setState({taskStates, taskLoading: false});
            }
        });
    };

    render() {
        const {worktracks, loading, taskLoading,worktask} = this.state;
        if (taskLoading) {
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
                    <ActivityIndicator size="large" color="#03bafc" style={{flex: 1}} />
                </View>
            );
        }
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
