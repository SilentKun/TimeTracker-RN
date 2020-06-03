import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import {deleteProject, deleteTask, editProject, editTask} from '../../Networking';
import {AppButton, AppInput, AppNavigationBar, AppTouchableIcon} from '../UIKit';
import routes from '../../Constants/routes';

class EditTaskScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        const {worktask} = this.props.navigation.state.params;
        console.log('TASDSADADAD', worktask.Duration)
        this.setState({title: worktask.Title, description: worktask.Description, duration: worktask.Duration.toString()});
    }

    _deleteTask = () => {
        const {worktask} = this.props.navigation.state.params;
        deleteTask(worktask.Id, (error, response) => {
            if (error) {
                alert(error);
            } else {
                this.props.navigation.navigate(routes.ProjectDetailsScreen);
            }
        });
    };

    _editTask = () => {
        const {title, description, duration} = this.state;
        const {worktask} = this.props.navigation.state.params;
        const body = {worktask: {Id: worktask.Id, Title: title.trim(), Description: description.trim(), Duration: parseInt(duration, 10)}};
        editTask(body, (error, response) => {
            if (error) {
                alert(error);
            } else {
                this.props.navigation.goBack();
            }
        });
    };

    render() {
        console.log('STATE', this.state.duration)
        return (
            <View style={{flex: 1}}>
                <AppNavigationBar style={styles.navigationBar}>
                    <AppTouchableIcon
                        style={styles.menuIcon}
                        icon="ios-arrow-back"
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <Text style={styles.title}>
                        Редактирование задачи
                    </Text>
                </AppNavigationBar>
                <AppInput
                    style={styles.input}
                    value={this.state.title}
                    placeholder="Название"
                    onChangeText={(text) => this.setState({title: text})}
                    autoFocus={true}
                    placeholderStyle={styles.placeholderStyle}
                    autoCorrect={false}
                />
                <AppInput
                    style={styles.input}
                    placeholder="Описание"
                    value={this.state.description}
                    placeholderStyle={styles.placeholderStyle}
                    onChangeText={(text) => this.setState({description: text})}
                />
                <AppInput
                    style={styles.input}
                    placeholder="Длительность"
                    value={this.state.duration}
                    placeholderStyle={styles.placeholderStyle}
                    onChangeText={(text) => this.setState({duration: text})}
                />
                <AppButton
                    style={styles.button}
                    onPress={this._editTask}
                    text="Отредактировать"
                />
                <AppButton
                    isDestructive={true}
                    style={styles.button}
                    onPress={this._deleteTask}
                    text="Удалить задачу"
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
    input: {
        marginHorizontal: 20,
        marginTop: 10,
    },
    title: {
        marginLeft: 20,
        fontSize: 17,
        letterSpacing: 0.15,
        color: '#FFF',
    },
    button: {
        marginTop: 10,
        marginHorizontal: 20,
    },
});

export default EditTaskScreen;
