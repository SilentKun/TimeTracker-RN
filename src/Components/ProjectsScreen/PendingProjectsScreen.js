import React, {Component} from 'react';
import {StyleSheet, View, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import {loadProjects} from '../../Networking';
import {CommonCell} from '../UIKit';

class PendingProjectsScreen extends Component {
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
            this.setState({projects, loading: false});
        });
    };

    _renderItem = ({item}) => {
        return (
            <CommonCell {...item} />
        );
    };

    render() {
        const {projects, loading} = this.state;
        if (loading) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={{flex: 1}}>
                <FlatList
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    data={projects[0]?.notSignedProjects}
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

export default PendingProjectsScreen;
