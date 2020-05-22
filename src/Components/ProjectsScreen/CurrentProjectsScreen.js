import React, {Component} from 'react';
import {StyleSheet, View, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import {loadProjects} from '../../Networking';
import {CommonCell} from '../UIKit';
import routes from '../../Constants/routes';

class CurrentProjectsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            loading: true,
        };
    }

    componentDidMount() {
        this._loadProjects();
    }

    _loadProjects = () => {
        loadProjects((error, projects) => {
            if (error) {
                this.setState({loading: false});
                alert(error);
            } else {
                this.setState({projects, loading: false});
            }
        });
    };

    _renderItem = ({item}) => {
        console.log(item)
        const project = {
            id: item.id,
            title: item.title,
            description: item.description,
        }
        return (
            <CommonCell
                key={item.id}
                {...item}
                onPress={() => this.props.navigation.navigate(routes.TasksStack, {project})}
            />
        );
    };

    render() {
        const {projects, loading} = this.state;
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
                        this._loadProjects();
                    }}
                />
                <FlatList
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    data={projects[0]?.signedProjects}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderItem}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={this._loadProjects} />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    },
    contentContainer: {

        alignItems: 'center',
    },


});

export default CurrentProjectsScreen;
