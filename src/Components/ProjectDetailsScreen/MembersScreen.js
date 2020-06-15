import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator, FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/Ionicons';
import {addProjectMember, deleteProjectMember, loadProjectMembers} from '../../Networking/Projects';
import {AppPopup} from '../UIKit';
import {loadTasks, updateUser} from '../../Networking';
import MembersCell from './MembersCell';
import LoginManager from '../../Helpers/LoginManager';

class MembersScreen extends Component {
    constructor(props) {
        super(props);
        this.user = LoginManager.shared().getUser();
        this.state = {
            users: [],
            loading: true,
            isDialogVisible: false,
            isModalVisible: false,
            isRightModalVisible: false,
            right: '',
        };
    }

    componentDidMount() {
        this._loadMembers();
    }

    _loadMembers = () => {
        const {project} = this.props.navigation.state?.params;
        loadTasks(project.id, (error, response) => {
            if (error) {
                this.setState({loading: false});
                alert(error);
            } else {
                console.log('MEN', response.caller.right)
                this.setState({users: response.users, isAdmin: response.caller.right.Id !== 1, loading: false});
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
        addProjectMember({ProjectId: project.id.toString(), UserName: login}, (error, response) => {
            if (error) {
                alert(error);
            } else {
                this._loadMembers();
                this.setState((prevState) => {
                    return {
                        isDialogVisible: false,
                        login: '',
                    };
                });
            }
        });
    };

    _removeMember = (currentUser) => {
        const {project} = this.props.navigation.state?.params;
        const filteredMembers = this.state.users.filter((item) => item.Id !== currentUser.Id);
        this.setState({ isModalVisible: false });
        deleteProjectMember({ProjectId: project.id.toString(), UserId: currentUser.Id}, (error, response) => {
            if (error) {
                this.setState({loading: false});
                alert(error);
            } else {
                this.setState({ users: filteredMembers });
            }
        });
    };

    _changeUserRight = (index, user) => {
        const {project} = this.props.navigation.state?.params;
        const body = {
            userLogin: user.login,
            rightId: index.toString(),
            projectId: project.id.toString(),
        }
        console.log(body)
        updateUser(
            body,
            (error, response) => {
                if (error) {
                    this.setState({loading: false});
                    alert(error);
                } else {
                    this._loadMembers();
                    this.setState({ isRightModalVisible: false });
                }
            },
        );
    };

    _renderItem = ({item}) => {
        return (
            <MembersCell
                {...item}
                currentUser={this.user}
                isAdmin={this.state.isAdmin}
                selectedValue={this.state.right}
                value={this.state.right}
                onPressRight={() => {
                    this.setState({isRightModalVisible: true, currentUser: item});
                }}
                onPressDelete={() => {
                    this.setState({isModalVisible: true, currentUser: item});
                }}
            />
        );
    };

    render() {
        const {users, loading, isDialogVisible, isModalVisible, currentUser, isRightModalVisible} = this.state;

        if (loading) {
            return (
                <View style={styles.loadingIndicator}>
                    <ActivityIndicator size="large" color="#03bafc" />
                </View>
            );
        }
        return (
            <View style={{flex: 1}}>
                <FlatList
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    data={users}
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
                <AppPopup
                    isDialogVisible={isRightModalVisible}
                    title={`Изменить права пользователя ${currentUser?.login}`}
                    onChangeRight={(item, index) => this.setState({right: index})}
                    submit={() => this._changeUserRight(this.state.right, currentUser)}
                    closeDialog={() => { this.setState({isRightModalVisible: false}); }}
                />
                {this.props.isAdmin &&
                <FloatingAction
                    color="#03bafc"
                    floatingIcon={<Icon name="md-person-add" size={30} color="#FFF" />}
                    onPressMain={() => {
                        this.setState({isDialogVisible: true});
                    }}
                    showBackground={false}
                />}
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
    title: {
        marginLeft: 20,
        fontSize: 17,
        letterSpacing: 0.15,
        color: '#FFF',
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
