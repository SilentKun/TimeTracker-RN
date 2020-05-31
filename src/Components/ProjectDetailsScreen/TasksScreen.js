import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator, FlatList, RefreshControl, Text} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { FloatingAction } from 'react-native-floating-action';
import {CommonCell, AppPopup} from '../UIKit';
import {addTask, loadTasks} from '../../Networking';
import routes from '../../Constants/routes';

const actions = [
    {
        color: '#03bafc',
        text: 'Отсортировать задачи по состоянию',
        name: 'bt_sort_by_state',
        icon: require('./img/sortIcon.png'),
        position: 2,
    },
    {
        color: '#03bafc',
        text: 'Сортировка по умолчанию',
        icon: require('./img/defaultSortIcon.png'),
        name: 'bt_default_sort',
        position: 3,
    },
    {
        color: '#03bafc',
        text: 'Добавить задачу',
        name: 'bt_add_task',
        icon: require('./img/addIcon.png'),
        position: 1,
    },
];

class TasksScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            loading: true,
            isDialogVisible: false,
            duration: '',
            orderTasksFunc: (tasks) => tasks,
        };
    }

    componentDidMount() {
        this._loadTasks();
    }

    _loadTasks = () => {
        const {project} = this.props.navigation.state?.params;
        loadTasks(project.id, (error, response) => {
            if (error) {
                this.setState({loading: false});
                alert(error);
            } else {
                this.setState({tasks: response.tasks, isAdmin: response.isAdmin, loading: false});
            }
        });
    };

    _addTask = () => {
        const {project} = this.props.navigation.state?.params;
        const {title, description, duration} = this.state;
        if ((!title || !title.trim()) && (!duration || !duration.trim())) {
            alert('Заполните название и продолжительность задачи!');
            return;
        }
        const task = {
            Title: title,
            Description: description,
            Duration: parseInt(duration, 10),
            StateId: 1,
            ProjectId: parseInt(project.id, 10),
            CreatedDate: new Date(),
        };
        addTask({worktask: task}, (error, response) => {
            if (error) {
                alert(error);
            } else {
                this._loadTasks();
                this.setState((prevState) => {
                    return {
                        tasks: [...prevState.tasks, task],
                        isDialogVisible: false,
                        title: '',
                        description: '',
                        duration: '',
                    };
                });
            }
        });
    };

    _handleOptions = (button) => {
        switch (button) {
        case 'bt_add_task':
            this.setState({isDialogVisible: true});
            break;
        case 'bt_sort_by_state':
            this.setState({ orderTasksFunc: (tasks) => tasks.sort((a, b) => (a.StateId >= b.StateId ? 1 : -1)) });
            break;
        case 'bt_default_sort':
            this.setState({ orderTasksFunc: (tasks) => tasks });
            break;
        default:
        }
    };

    _renderItem = ({item}) => {
        const {project} = this.props.navigation.state?.params;
        console.log('STATE', item.State);
        return (
            <CommonCell
                key={item.id}
                {...item}
                onPress={() => this.props.navigation.navigate(routes.TaskDetailsStack, {project, task: item})}
            />
        );
    };

    render() {
        const {tasks, loading, isDialogVisible} = this.state;
        console.log(this.state.tasks);
        if (loading) {
            return (
                <View style={styles.loadingIndicator}>
                    <ActivityIndicator size="large" color="#03bafc" />
                </View>
            );
        }
        return (
            <View style={{flex: 1}}>
                <NavigationEvents
                    onWillFocus={() => {
                        this._loadTasks();
                    }}
                />
                <FlatList
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    data={this.state.orderTasksFunc(this.state.tasks.slice())}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderItem}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={this._loadTasks} />}
                />
                <AppPopup
                    isDialogVisible={isDialogVisible}
                    title="Добавить задачу"
                    hintInput="Никнейм"
                    firstHintInput="Название"
                    secondHintInput="Описание"
                    thirdHintInput="Длительность"
                    submit={(inputText) => { this._addTask(inputText); }}
                    closeDialog={() => { this.setState({isDialogVisible: false}); }}
                    onChangeFirstText={(title) => this.setState({title})}
                    onChangeSecondText={(description) => this.setState({description})}
                    onChangeThirdText={(duration) => this.setState({duration})}
                    duration={this.state.duration}
                />
                <FloatingAction
                    color="#03bafc"
                    actions={actions}
                    onPressItem={(btn) => {
                        this._handleOptions(btn);
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        marginTop: 10,
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
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

export default TasksScreen;
