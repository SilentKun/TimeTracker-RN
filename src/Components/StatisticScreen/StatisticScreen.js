import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, RefreshControl} from 'react-native';
import moment from 'moment';
import {DrawerActions} from 'react-navigation-drawer';
import {NavigationEvents} from 'react-navigation';
import {loadProjects, loadUsers, loadCurrentUser, loadUserStats, loadTasks} from '../../Networking';
import {colors} from '../../Constants';
import {AppNavigationBar, AppTouchableIcon, WorktrackCell} from '../UIKit';
import StatisticPopup from './StatisticPopup';

class StatisticScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            projects: [],
            projectId: 0,
            users: [],
            userId: 0,
            startDate: '',
            endDate: '',
            taskId: 0,
            tasks: [],
            isAdmin: true,
            worktracks: [],
            isPopupStatVisible: false,
            projectValue: '',
            taskValue: '',
            userValue: '',
        };
    }

    componentDidMount() {
        this._loadProjects();
    }

    _loadProjects = () => {
        loadProjects((error, response) => {
            if (error) {
                alert(error);
            } else {
                const projects = response.acceptedProjects.map((item) => {
                    return {
                        value: item.Id,
                        label: item.Title,
                    };
                });
                this.setState({ projects, isPopupStatVisible: true });
            }
        });
    };

    _loadUsers = () => {
        if (this.state.isAdmin) {
            loadUsers(this.state.projectId, (error, response) => {
                if (error) {
                    alert(error);
                } else {
                    const users = response.users.map((item) => {
                        return {
                            value: item.Id,
                            label: item.login,
                        };
                    });
                    this.setState({ users });
                }
            });
        } else {
            loadCurrentUser((error, response) => {
                if (error) {
                    alert(error);
                } else {
                    const users = [{
                        value: response.user.Id,
                        label: response.user.Login,
                    }];
                    this.setState({users});
                }
            });
        }
    };

    _loadStats = () => {
        const { projectId, taskId, userId, startDate, endDate } = this.state;
        const body = {
            projectId,
            userId,
            startDate,
            endDate,
            taskId,
        };
        this.setState({loading: true, isPopupStatVisible: false});
        loadUserStats(body, (error, response) => {
            if (error) {
                this.setState({loading: false});
                alert(error);
            } else {
                this.setState({ worktracks: response, loading: false });
            }
        });
    };

    _onProjectChange = (value) => {
        loadTasks(value, (error, response) => {
            if (error) {
                alert(error);
            } else {
                const tasks = response.tasks.map((item) => {
                    return {
                        value: item.Id,
                        label: item.Title,
                    };
                });
                this.setState({
                    projectId: value,
                    tasks,
                    isAdmin: response.caller.right.Id === 1,
                }, () => { this._loadUsers(); });
            }
        });
    };

    _onUserChange = (value) => {
        if (value) {
            this.setState({ userId: value });
        } else {
            this.setState({ userId: 0 });
        }
    };

    _onTaskChange = (value) => {
        if (value) {
            this.setState({ taskId: value });
        } else {
            this.setState({ taskId: 0 });
        }
    };

    _onFromDate = (value) => {
        this.setState({ startDate: value });
    };

    _onEndDate = (value) => {
        this.setState({ endDate: value });
    };

    _renderItem = ({item}) => {
        const offset = moment().utcOffset();
        const startedTime = moment(item.startedTime).add(offset, 'm').format('DD.MM.YYYY HH:mm:ss');
        const stoppedTime = moment(item.stoppedTime).add(offset, 'm').format('DD.MM.YYYY HH:mm:ss');
        return (
            <WorktrackCell
                start={startedTime}
                stop={stoppedTime}
                key={item.id}
                {...item}
            />
        );
    };

    render() {
        const {worktracks, loading} = this.state;
        return (
            <View style={{flex: 1, backgroundColor: colors.feedBackground}}>
                <NavigationEvents
                    onWillFocus={() => {
                        if (!worktracks || worktracks.length === 0) {
                            this._loadProjects();
                        }
                    }}
                />
                <AppNavigationBar style={styles.navigationBar}>
                    <AppTouchableIcon
                        style={styles.menuIcon}
                        icon="ios-menu"
                        onPress={() => {
                            this.props.navigation.dispatch(DrawerActions.openDrawer());
                        }}
                    />
                    <Text style={styles.title}>
                        Отчёты
                    </Text>
                    <View style={styles.flexSpacing} />
                    <AppTouchableIcon
                        style={styles.addIcon}
                        icon="ios-more"
                        onPress={() => {
                            this.setState({isPopupStatVisible: true});
                        }}
                        fontSize={36}
                    />
                </AppNavigationBar>
                <FlatList
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    data={worktracks}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderItem}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={this._loadProjects} />}
                />
                <StatisticPopup
                    disabled={this.state.startDate === '' && this.state.endDate === ''}
                    tasks={this.state.tasks}
                    projects={this.state.projects}
                    users={this.state.users}
                    onChangeProject={this._onProjectChange}
                    onChangeTask={this._onTaskChange}
                    onChangeUser={this._onUserChange}
                    isPopupStatVisible={this.state.isPopupStatVisible}
                    submit={this._loadStats}
                    closeDialog={() => { this.setState({isPopupStatVisible: false}); }}
                    onFromDateChange={this._onFromDate}
                    onEndDateChange={this._onEndDate}
                    fromDate={this.state.startDate}
                    endDate={this.state.endDate}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    },
    contentContainer: {
        marginTop: 10,
        paddingBottom: 30,
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
        paddingHorizontal: 22,
    },
    flexSpacing: {
        flex: 1,
    },
});

export default StatisticScreen;
