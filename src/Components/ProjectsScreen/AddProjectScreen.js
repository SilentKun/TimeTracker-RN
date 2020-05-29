import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import {addProject} from '../../Networking';
import {AppNavigationBar, AppTouchableIcon, AppButton, AppInput} from '../UIKit';
import {colors} from '../../Constants';

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
        addProject({Title: title, Description: description}, (error, response) => {
            if (error) {
                alert(error);
            } else {
                // TODO: Refactoring
                this.props.navigation.goBack();
            }
        });
    };

    render() {
        const {title} = this.state;
        return (
            <View style={{flex: 1, backgroundColor: colors.feedBackground}}>
                <AppNavigationBar style={styles.navigationBar}>
                    <AppTouchableIcon
                        style={styles.menuIcon}
                        icon="ios-arrow-back"
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <Text style={styles.title}>
                        Создать проект
                    </Text>
                </AppNavigationBar>
                <AppInput
                    style={styles.input}
                    placeholder="Название"
                    onChangeText={(text) => this.setState({title: text})}
                    autoFocus={true}
                    placeholderStyle={styles.placeholderStyle}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    autoCorrect={false}
                />
                <AppInput
                    style={styles.input}
                    placeholder="Описание"
                    placeholderStyle={styles.placeholderStyle}
                    onChangeText={(text) => this.setState({description: text})}
                    onSubmitEditing={this._signIn}
                    reference={(input) => this.passwordInput = input}
                />
                <AppButton
                    style={styles.button}
                    onPress={this._addProject}
                    text="Создать"
                    disabled={!title}
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

export default AddProjectScreen;
