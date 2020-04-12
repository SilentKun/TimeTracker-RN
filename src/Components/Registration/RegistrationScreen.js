import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput, ActivityIndicator,
} from 'react-native';
import LoginHelper from './LoginHelper';

class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.loginHelper = new LoginHelper(
            (stateUpdate) => this.setState(stateUpdate),
            () => this.state,
            (params) => this.props.navigation.navigate(params),
        );
        this.state = this.loginHelper.buildInitialState();
    }

    _signUp = () => {
        this.loginHelper.signUp();
    };

    render() {
        const {login, password, inProgress} = this.state;
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <TextInput
                    style={{marginBottom: 10}}
                    placeholder="Username"
                    onChangeText={(text) => this.setState({login: text})}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={() => this.passwordInput.focus()}
                />
                <TextInput
                    placeholder="Password"
                    onChangeText={(text) => this.setState({password: text})}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    ref={(input) => this.passwordInput = input}
                    onSubmitEditing={this._signUp}
                />

                <TouchableOpacity
                    style={{marginTop: 10}}
                    onPress={this._signUp}
                    disabled={inProgress || !login || !password}
                >
                    <Text>Register</Text>
                </TouchableOpacity>
                {this.state.inProgress && <ActivityIndicator style={{marginTop: 10}} />}
            </View>
        );
    }
}

export default SignUpScreen;
