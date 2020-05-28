import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import LoginHelper from './LoginHelper';
import {routes} from '../../Constants';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.loginHelper = new LoginHelper(
            (stateUpdate) => this.setState(stateUpdate),
            () => this.state,
            (params) => this.props.navigation.navigate(params),
        );
        this.state = this.loginHelper.buildInitialState();
    }

    _signIn = () => {
        this.loginHelper.signIn();
    };

    render() {
        const {Login, Pass, inProgress} = this.state;
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <TextInput
                    style={{marginBottom: 10}}
                    placeholder="Логин"
                    onChangeText={(text) => this.setState({Login: text})}
                    autoFocus={true}
                    placeholderStyle={styles.placeholderStyle}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TextInput
                    placeholder="Пароль"
                    placeholderStyle={styles.placeholderStyle}
                    onChangeText={(text) => this.setState({Pass: text})}
                    onSubmitEditing={this._signIn}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    ref={(input) => this.passwordInput = input}
                />

                <TouchableOpacity
                    style={{marginTop: 10}}
                    onPress={this._signIn}
                    disabled={inProgress || !Login || !Pass}
                >
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={inProgress}
                    onPress={() => {
                        this.props.navigation.navigate(routes.RegistrationScreen);
                    }}
                >
                    <Text>SignUp</Text>
                </TouchableOpacity>
                {inProgress && <ActivityIndicator style={{marginTop: 10}} />}
            </View>
        );
    }
}


const styles = StyleSheet.create(
    {
        placeholderStyle: {
            color: '#ABABAB',
            fontSize: 15,
            paddingBottom: 10,
        },
        inputStyle: {
            color: 'rgba(0, 0, 0, 0.87)',
            fontSize: 15,
            paddingBottom: 10,
        },
        text: {
            color: '#d3d3d3',
        },
    },
);

export default LoginScreen;
