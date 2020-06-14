import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import LoginHelper from './LoginHelper';
import {routes, colors} from '../../Constants';
import AppInput from '../UIKit/AppInput';
import {AppButton} from '../UIKit';

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
        const {login, password, inProgress} = this.state;
        return (
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: colors.feedBackground}}>
                <AppInput
                    style={styles.input}
                    placeholder="Логин"
                    onChangeText={(text) => this.setState({login: text})}
                    autoFocus={true}
                    placeholderStyle={styles.placeholderStyle}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <AppInput
                    style={styles.input}
                    placeholder="Пароль"
                    placeholderStyle={styles.placeholderStyle}
                    onChangeText={(text) => this.setState({password: text})}
                    onSubmitEditing={this._signIn}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    reference={(input) => this.passwordInput = input}
                />
                <AppButton
                    style={styles.button}
                    onPress={this._signIn}
                    disabled={inProgress || !login || !password}
                    text="Вход"
                />
                <AppButton
                    style={styles.button}
                    onPress={() => {
                        this.props.navigation.navigate(routes.RegistrationScreen);
                    }}
                    disabled={inProgress}
                    text="Регистрация"
                />
                {inProgress && <ActivityIndicator style={{marginTop: 10}} />}
            </View>
        );
    }
}


const styles = StyleSheet.create({
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
    input: {
        marginBottom: 10,
        marginHorizontal: 80,
    },
    button: {
        marginHorizontal: 80,
        marginBottom: 10,
    },
});

export default LoginScreen;
