import React, {Component} from 'react';
import {StyleSheet, View, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import {loadProjects} from '../../Networking';
import {CommonCell} from '../UIKit';

class PendingProjectsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectView: { SignedProjects: [], NotSignedProjects: [] },
            loading: true,
        };
    }

    componentDidMount() {
        this._loadProjects();
    }

    _loadProjects = () => {
        loadProjects((error, projectView) => {
            this.setState({projectView, loading: false});
        });
    };

    _renderItem = ({item}) => {
        return (
            <CommonCell {...item} />
        );
    };

    render() {
        const {projectView, loading} = this.state;
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
                    data={projectView?.NotSignedProjects}
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
