import React, {Component} from 'react';
import {StyleSheet, View, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import {loadProjects, acceptInvite, declineInvite} from '../../Networking';
import {AppPopup, CommonCell} from '../UIKit';

class PendingProjectsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectView: { NotSignedProjects: [] },
            loading: true,
            isModalVisible: false,
        };
    }

    componentDidMount() {
        this._loadProjects();
    }

    _acceptInvite = (projectId) => {
        acceptInvite({ProjectId: projectId}, (error, response) => {
            if (error) {
                alert(error);
            } else {
                this._loadProjects();
                this.setState({isModalVisible: false});
            }
        });
    };

    _declineInvite = (projectId) => {
        declineInvite(projectId, (error, response) => {
            if (error) {
                alert(error);
            } else {
                this._loadProjects();
                this.setState({isModalVisible: false});
            }
        });
    };

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
        return (
            <CommonCell
                isPending={true}
                key={item.Id}
                {...item}
                onPressAccept={() => this._acceptInvite(item.Id)}
                onPressDecline={() => this.setState({isModalVisible: true, projectId: item.Id})}
            />
        );
    };

    render() {
        const {projectView, loading, isModalVisible} = this.state;
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
                    data={projectView?.notAcceptedProjects}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderItem}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={this._loadProjects} />}
                />
                <AppPopup
                    style={styles.button}
                    isDialogVisible={isModalVisible}
                    title="Отклонить приглашение в проект?"
                    submit={() => this._declineInvite(this.state.projectId)}
                    closeDialog={() => { this.setState({isModalVisible: false}); }}
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
    button: {
        marginTop: 10,
        marginHorizontal: 80,
    },

});

export default PendingProjectsScreen;
