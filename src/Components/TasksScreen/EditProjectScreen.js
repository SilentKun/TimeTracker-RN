import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import {deleteProject, editProject} from '../../Networking';
import {AppNavigationBar, AppTouchableIcon} from '../UIKit';
import routes from '../../Constants/routes';

class EditProjectScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
        };
    }

    componentDidMount() {
        const {project} = this.props.navigation.state.params;
        this.setState({title: project.title, description: project.description});
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
        const {id} = project;
        editProject(id, {title, description}, (error, response) => {
            if (error) {
                alert(error);
            } else {
                const project = {
                    id,
                    title,
                    description,
                };
                this.props.navigation.navigate(routes.TasksScreen, {project});
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
                        Edit Project
                    </Text>
                </AppNavigationBar>
                <TextInput
                    style={{marginBottom: 10}}
                    value={this.state.title}
                    placeholder="Title"
                    onChangeText={(text) => this.setState({title: text})}
                    autoFocus={true}
                    placeholderStyle={styles.placeholderStyle}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    autoCorrect={false}
                />
                <TextInput
                    placeholder="Description"
                    value={this.state.description}
                    placeholderStyle={styles.placeholderStyle}
                    onChangeText={(text) => this.setState({description: text})}
                    onSubmitEditing={this._signIn}
                    ref={(input) => this.passwordInput = input}
                />

                <TouchableOpacity
                    style={{marginTop: 10}}
                    onPress={this._editProject}
                >
                    <Text>Edit Project</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{marginTop: 10}}
                    onPress={this._deleteProject}
                >
                    <Text style={{color: 'red'}}>Delete Project</Text>
                </TouchableOpacity>
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
    title: {
        marginLeft: 20,
        fontSize: 17,
        letterSpacing: 0.15,
        color: '#FFF',
    },

});

export default EditProjectScreen;
