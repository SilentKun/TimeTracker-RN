import React, {Component} from 'react';
import {StyleSheet, View, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import {loadProjects} from '../../Networking';
import {CommonCell} from '../UIKit';
import {routes, colors} from '../../Constants';

class CurrentProjectsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectView: { SignedProjects: [] },
            loading: true,
        };
    }

    componentDidMount() {
        this._loadProjects();
    }

    _loadProjects = () => {
        loadProjects((error, projectView) => {
            if (error) {
                this.setState({loading: false});
                alert(error);
            } else {
                this.setState({projectView, loading: false});
            }
        });
    };

    _renderItem = ({item}) => {
        const project = {
            id: item.Id,
            title: item.Title,
            description: item.Description,
        };
        return (
            <CommonCell
                key={item.Id}
                {...item}
                onPress={() => this.props.navigation.navigate(routes.ProjectDetailsStack, {project})}
            />
        );
    };

    render() {
        const {projectView, loading} = this.state;
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
                    data={projectView?.SignedProjects}
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
        marginTop: 10,
        paddingBottom: 30,
    },


});

export default CurrentProjectsScreen;
