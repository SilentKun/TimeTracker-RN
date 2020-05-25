import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
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
        const {password, repeatPassword} = this.state;
        if (password !== repeatPassword) {
            alert('Пароли не совпадают!');
            return;
        }
        this.loginHelper.signUp();
    };

    render() {
        const {login, password, inProgress, birthdate} = this.state;
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ScrollView contentContainerStyle={{flex: 1,alignItems: 'center', justifyContent: 'center'}}>
                    <TextInput
                        style={{marginBottom: 10}}
                        placeholder="Login"
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
                        onSubmitEditing={() => this.repeatPasswordInput.focus()}
                    />
                    <TextInput
                        placeholder="Repeat password"
                        onChangeText={(text) => this.setState({repeatPassword: text})}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        ref={(input) => this.repeatPasswordInput = input}
                        onSubmitEditing={() => this.nameInput.focus()}
                    />
                    <TextInput
                        placeholder="Name"
                        onChangeText={(text) => this.setState({name: text})}
                        autoCapitalize="none"
                        autoCorrect={false}
                        ref={(input) => this.nameInput = input}
                        onSubmitEditing={() => this.surnameInput.focus()}
                    />
                    <TextInput
                        placeholder="Surname"
                        onChangeText={(text) => this.setState({surname: text})}
                        autoCapitalize="none"
                        autoCorrect={false}
                        ref={(input) => this.surnameInput = input}
                        onSubmitEditing={() => this.middlenameInput.focus()}
                    />
                    <TextInput
                        placeholder="Patronymic"
                        onChangeText={(text) => this.setState({middlename: text})}
                        autoCapitalize="none"
                        autoCorrect={false}
                        ref={(input) => this.middlenameInput = input}
                        onSubmitEditing={() => this.emailInput.focus()}
                    />
                    <TextInput
                        placeholder="E-mail"
                        onChangeText={(text) => this.setState({email: text})}
                        autoCapitalize="none"
                        autoCorrect={false}
                        ref={(input) => this.emailInput = input}
                        onSubmitEditing={() => this.cityInput.focus()}
                    />
                    <TextInput
                        placeholder="City"
                        onChangeText={(text) => this.setState({city: text})}
                        autoCapitalize="none"
                        autoCorrect={false}
                        ref={(input) => this.cityInput = input}
                    />
                    <DatePicker
                        style={{width: 200}}
                        date={birthdate}
                        mode="date"
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0,
                            },
                            dateInput: {
                                marginLeft: 36,
                            },
                        }}
                        onDateChange={(birthdate) => { this.setState({birthdate}); }}
                    />
                    <TouchableOpacity
                        style={{marginTop: 10}}
                        onPress={this._signUp}
                        disabled={inProgress || !login || !password}
                    >
                        <Text>Register</Text>
                    </TouchableOpacity>
                    {this.state.inProgress && <ActivityIndicator style={{marginTop: 10}} />}
                </ScrollView>
            </View>
        );
    }
}

export default SignUpScreen;
