import React, {Component} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {AppNavigationBar, AppTouchableIcon, CommonCell} from '../UIKit';
import routes from '../../Constants/routes';
import TaskHeader from './TaskHeader';
import {loadWorktracks} from '../../Networking';

class TaskDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            worktracks: [],
            states: [],
            loading: true,
        };
    }

    componentDidMount() {
        this._loadWorktracks();
    }

    _renderItem = ({item}) => {
        return (
            <CommonCell
                key={item.id}
                {...item}
            />
        );
    };

    _loadWorktracks = () => {
        const {project, task} = this.props.navigation.state?.params;
        console.log('FEFEWFFEF', project, task)
        loadWorktracks(project.id, task.id, (error, worktracks) => {
            if (error) {
                this.setState({loading: false});
                alert(error);
            } else {
                this.setState({worktracks, loading: false});
            }
        });
    };

    render() {
        const {worktracks, loading} = this.state;
        const {project, task} = this.props.navigation.state?.params;
        if (loading) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" color="#03bafc" />
                </View>
            );
        }
        return (
            <View style={{flex: 1}}>
                <AppNavigationBar style={styles.navigationBar}>
                    <AppTouchableIcon
                        style={styles.menuIcon}
                        icon="ios-menu"
                        onPress={this._onMenuPress}
                    />
                    <Text style={styles.title}>
                        {task.title}
                    </Text>
                    <View style={styles.flexSpacing} />
                    <AppTouchableIcon
                        style={styles.addIcon}
                        fontSize={28}
                        icon="md-create"
                        onPress={this._onAddProjectPress}
                    />
                </AppNavigationBar>
                {/*<TaskHeader*/}
                {/*    projectTitle={project.title}*/}
                {/*    {...task}*/}
                {/*/>*/}
                <FlatList
                    style={styles.container}
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
    contentContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    flexSpacing: {
        flex: 1,
    }

});

export default TaskDetailsScreen;
