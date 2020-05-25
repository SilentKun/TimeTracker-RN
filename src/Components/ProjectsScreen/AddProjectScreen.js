import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import {addProject} from '../../Networking';
import {AppNavigationBar, AppTouchableIcon} from '../UIKit';

class AddProjectScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
        };
    }

    _addProject = () => {
        const {title, description} = this.state;
        addProject({title, description}, (error, response) => {
            if (error) {
                alert(error);
            } else {
                // TODO: Refactoring
                this.props.navigation.goBack();
            }
        });
    };

    render() {
        const {title, description} = this.state;
        return (
            <View style={{flex: 1}}>
                <AppNavigationBar style={styles.navigationBar}>
                    <AppTouchableIcon
                        style={styles.menuIcon}
                        icon="ios-arrow-back"
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <Text style={styles.title}>
                        Add Project
                    </Text>
                </AppNavigationBar>
                <TextInput
                    style={{marginBottom: 10}}
                    placeholder="Название"
                    onChangeText={(text) => this.setState({title: text})}
                    autoFocus={true}
                    placeholderStyle={styles.placeholderStyle}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    autoCorrect={false}
                />
                <TextInput
                    placeholder="Описание"
                    placeholderStyle={styles.placeholderStyle}
                    onChangeText={(text) => this.setState({description: text})}
                    onSubmitEditing={this._signIn}
                    secureTextEntry={true}
                    ref={(input) => this.passwordInput = input}
                />

                <TouchableOpacity
                    style={{marginTop: 10}}
                    onPress={this._addProject}
                    disabled={!title || !description}
                >
                    <Text>Login</Text>
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

export default AddProjectScreen;
