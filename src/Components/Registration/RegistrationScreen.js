import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    ActivityIndicator,
    ScrollView, StyleSheet,
    Platform
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import LoginHelper from './LoginHelper';
import {AppInput, AppNavigationBar, AppTouchableIcon, AppButton} from '../UIKit';
import {colors} from '../../Constants';

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
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.feedBackground}}>
                <AppNavigationBar style={styles.navigationBar}>
                    <AppTouchableIcon
                        icon="ios-arrow-back"
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <Text style={styles.title}>
                        Регистрация
                    </Text>
                </AppNavigationBar>
                <ScrollView contentContainerStyle={{marginTop: 30, alignItems: 'center', justifyContent: 'center'}}>
                    <AppInput
                        style={styles.input}
                        placeholder="Логин"
                        onChangeText={(text) => this.setState({login: text})}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onSubmitEditing={() => this.passwordInput.focus()}
                    />
                    <AppInput
                        style={styles.input}
                        placeholder="Пароль"
                        onChangeText={(text) => this.setState({password: text})}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        reference={(input) => this.passwordInput = input}
                        onSubmitEditing={() => this.repeatPasswordInput.focus()}
                    />
                    <AppInput
                        style={styles.input}
                        placeholder="Повторите пароль"
                        onChangeText={(text) => this.setState({repeatPassword: text})}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        reference={(input) => this.repeatPasswordInput = input}
                        onSubmitEditing={() => this.nameInput.focus()}
                    />
                    <AppInput
                        style={styles.input}
                        placeholder="Имя"
                        onChangeText={(text) => this.setState({name: text})}
                        autoCorrect={false}
                        reference={(input) => this.nameInput = input}
                        onSubmitEditing={() => this.surnameInput.focus()}
                    />
                    <AppInput
                        style={styles.input}
                        placeholder="Фамилия"
                        onChangeText={(text) => this.setState({surname: text})}
                        autoCorrect={false}
                        reference={(input) => this.surnameInput = input}
                        onSubmitEditing={() => this.middlenameInput.focus()}
                    />
                    <AppInput
                        style={styles.input}
                        placeholder="Отчество"
                        onChangeText={(text) => this.setState({middlename: text})}
                        autoCorrect={false}
                        reference={(input) => this.middlenameInput = input}
                        onSubmitEditing={() => this.emailInput.focus()}
                    />
                    <AppInput
                        style={styles.input}
                        placeholder="Почта"
                        onChangeText={(text) => this.setState({email: text})}
                        autoCapitalize="none"
                        autoCorrect={false}
                        reference={(input) => this.emailInput = input}
                        onSubmitEditing={() => this.cityInput.focus()}
                    />
                    <AppInput
                        style={styles.input}
                        placeholder="Город"
                        onChangeText={(text) => this.setState({city: text})}
                        autoCorrect={false}
                        reference={(input) => this.cityInput = input}
                    />
                    <DatePicker
                        style={{marginTop: 8, width: 230}}
                        date={birthdate}
                        mode="date"
                        placeholder="Дата рождения"
                        format="DD-MM-YYYY"
                        confirmBtnText="Подтвердить"
                        cancelBtnText="Отменить"
                        showIcon={false}
                        customStyles={{
                            dateInput: {
                                backgroundColor: colors.light,
                                borderRadius: 10,
                                height: 52,
                                borderColor: colors.charcoalGrey10,
                                alignItems: 'flex-start',
                            },
                            placeholderText: {
                                color: '#9f9f9f',
                                fontSize: 14,
                                paddingHorizontal: 16,
                            },
                        }}
                        onDateChange={(birthdate) => { this.setState({birthdate}); }}
                    />
                    <AppButton
                        style={{marginTop: 30, paddingHorizontal: 70}}
                        onPress={this._signUp}
                        disabled={inProgress || !login || !password}
                        text="Зарегистрироваться"
                    />
                    {this.state.inProgress && <ActivityIndicator style={{marginTop: 10}} />}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        marginLeft: 20,
        fontSize: 17,
        letterSpacing: 0.15,
        color: '#FFF',
    },
    navigationBar: {
        width: '100%',
    },
    input: {
        marginBottom: 10,
        marginHorizontal: 80,
    },
});

export default SignUpScreen;
