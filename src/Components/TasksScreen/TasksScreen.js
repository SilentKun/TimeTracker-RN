import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator, FlatList, RefreshControl} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { FloatingAction } from 'react-native-floating-action';
import {loadTasks} from '../../Networking/Tasks';
import {CommonCell} from '../UIKit';

const actions = [
    {
        text: 'Sort tasks by state',
        name: 'bt_sort_by_state',
        position: 1,
    },
    {
        text: 'Default sorting',
        name: 'bt_default_sort',
        position: 2,
    },
];

class TasksScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            loading: true,
        };
    }

    componentDidMount() {
        this._loadTasks();
    }

    _loadTasks = () => {
        const {project} = this.props.navigation.state?.params;
        console.log('LOG', project.id);
        loadTasks(project.id, (error, tasks) => {
            if (error) {
                this.setState({loading: false});
                alert(error);
            } else {
                this.setState({tasks, loading: false});
            }
        });
    };

    _renderItem = ({item}) => {
        return (
            <CommonCell {...item} />
        );
    };

    render() {
        const {tasks, loading} = this.state;
        console.log(this.props);
        if (loading) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
                    data={tasks}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderItem}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={this._loadProjects} />}
                />
                <FloatingAction
                    actions={actions}
                    onPressItem={(name) => {
                        console.log(`selected button: ${name}`);
                    }}
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

export default TasksScreen;
