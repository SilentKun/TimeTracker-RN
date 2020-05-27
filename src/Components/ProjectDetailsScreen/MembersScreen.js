import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator, FlatList, RefreshControl} from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import {addProjectMember, deleteProjectMember, loadProjectMembers} from '../../Networking/Projects';
import {CommonCell, AppPopup} from '../UIKit';

const actions = [
    {
        text: 'Add member',
        name: 'bt_add_member',
        position: 1,
    },
];

class MembersScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            isDialogVisible: false,
            isModalVisible: false,
        };
    }

    componentDidMount() {
        this._loadMembers();
    }

    _loadMembers = () => {
        const {project} = this.props.navigation.state?.params;
        console.log('LOG', project.id);
        loadProjectMembers(project.id, (error, members) => {
            if (error) {
                this.setState({loading: false});
                alert(error);
            } else {
                this.setState({members, loading: false});
            }
        });
    };

    _addMember = () => {
        const {project} = this.props.navigation.state?.params;
        const {login} = this.state;
        if (!login || !login.trim()) {
            alert('Вы не ввели имя участника!');
            return;
        }
        const member = {
            login,
        };
        addProjectMember(project.id, member, (error, response) => {
            if (error) {
                alert(error);
            } else {
                this._loadMembers();
                this.setState((prevState) => {
                    return {
                        members: [...prevState.members, member],
                        isDialogVisible: false,
                        login: '',
                    };
                });
            }
        });
    };

    _removeMember = (currentUser) => {
        const {project} = this.props.navigation.state?.params;
        const filteredMembers = this.state.members.filter((item) => item.login !== currentUser.login);
        this.setState({ isModalVisible: false });
        deleteProjectMember(project.id, currentUser.id, (error, response) => {
            if (error) {
                this.setState({loading: false});
                alert(error);
            } else {
                this.setState({ members: filteredMembers });
            }
        });
    };

    _renderItem = ({item}) => {
        return (
            <CommonCell
                {...item}
                onLongPress={() => {
                    this.setState({isModalVisible: true, currentUser: item});
                }}
            />
        );
    };

    render() {
        const {members, loading, isDialogVisible, isModalVisible, currentUser} = this.state;
        if (loading) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" color="#03bafc" />
                </View>
            );
        }
        return (
            <View style={{flex: 1}}>
                <FlatList
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    data={members}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderItem}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={this._loadMembers} />}
                />
                <AppPopup
                    isDialogVisible={isDialogVisible}
                    title="Добавить нового участника"
                    message="Введите никнейм участника, которого хотите пригласить в данный проект."
                    firstHintInput="Никнейм"
                    submit={this._addMember}
                    closeDialog={() => { this.setState({isDialogVisible: false}); }}
                    onChangeFirstText={(login) => this.setState({login})}
                />
                <AppPopup
                    isDialogVisible={isModalVisible}
                    title="Вы действительно хотите исключить данного участника?"
                    submit={() => this._removeMember(currentUser)}
                    closeDialog={() => { this.setState({isModalVisible: false}); }}
                />
                <FloatingAction
                    actions={actions}
                    onPressItem={() => {
                        this.setState({isDialogVisible: true});
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

export default MembersScreen;
