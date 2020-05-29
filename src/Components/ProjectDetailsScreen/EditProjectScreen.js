import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import {deleteProject, editProject} from '../../Networking';
import {AppButton, AppInput, AppNavigationBar, AppTouchableIcon} from '../UIKit';
import routes from '../../Constants/routes';

class EditProjectScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        const {project} = this.props.navigation.state.params;
        this.setState({title: project.Title, description: project.Description});
    }

    _deleteProject = () => {
        const {project} = this.props.navigation.state.params;
        const {id} = project;
        deleteProject(id, (error, response) => {
            if (error) {
                alert(error);
            } else {
                this.props.navigation.navigate(routes.ProjectsScreen);
            }
        });
    };

    _editProject = () => {
        const {title, description} = this.state;
        const {project} = this.props.navigation.state.params;
        console.log('FSFEFEF', project);
        const body = {Project: {Id: project.Id, Title: title.trim(), Description: description.trim()}}
        editProject(body, (error, response) => {
            if (error) {
                alert(error);
            } else {
                this.props.navigation.goBack();
            }
        });
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <AppNavigationBar style={styles.navigationBar}>
                    <AppTouchableIcon
                        style={styles.menuIcon}
                        icon="ios-arrow-back"
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <Text style={styles.title}>
                        Редактирование проекта
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
                    value={this.state.description}
                    placeholderStyle={styles.placeholderStyle}
                    onChangeText={(text) => this.setState({description: text})}
                />
                <AppButton
                    style={styles.button}
                    onPress={this._editProject}
                    text="Отредактировать"
                />
                <AppButton
                    isDestructive={true}
                    style={styles.button}
                    onPress={this._deleteProject}
                    text="Удалить проект"
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

export default EditProjectScreen;
