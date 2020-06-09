import React, {Component} from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    ScrollView, StyleSheet,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {DrawerActions} from 'react-navigation-drawer';
import {NavigationEvents} from 'react-navigation';
import {AppInput, AppNavigationBar, AppTouchableIcon, AppButton} from '../UIKit';
import {colors} from '../../Constants';
import {updateUserData, loadUserInfo} from '../../Networking';

const datePickerStyle = {
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
    dateText: {
        marginLeft: 15,
    },
};

class UserPageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false,

        };
    }

    componentDidMount() {
        this._loadUserInfo();
    }

    _loadUserInfo = () => {
        const {currentUser} = this.props.navigation.state.params;
        loadUserInfo((error, response) => {
            if (error) {
                alert(error);
            } else {
                this.setState({
                    login: currentUser.login,
                    firstName: response.user.FirstName,
                    middleName: response.user.MiddleName,
                    surname: response.user.Surname,
                    email: response.user.Email,
                    city: response.user.City,
                    birthDate: response.user.BirthDate,
                });
            }
        });
        setTimeout(() => { this.setState({ editable: true }); }, 100);
    };

    _onMenuPress = () => {
        this.props.navigation.dispatch(DrawerActions.openDrawer());
    };

    _updateUserPage = () => {
        const {
            password,
            repeatPassword,
            firstName,
            surname,
            middleName,
            email,
            birthDate,
            city,
            currentPass,
        } = this.state;
        if (password !== repeatPassword) {
            alert('Пароли не совпадают!');
            return;
        }
        const body = {
            CurrentPass: currentPass,
            Pass: password,
            FirstName: firstName,
            Surname: surname,
            MiddleName: middleName,
            City: city,
            BirthDate: birthDate,
            Email: email,
        };
        updateUserData(body, (error, response) => {
            if (error) {
                alert(error);
            } else {
                console.log(response);
            }
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <AppNavigationBar style={styles.navigationBar}>
                    <AppTouchableIcon
                        icon="ios-menu"
                        onPress={this._onMenuPress}
                    />
                    <Text style={styles.title}>
                        Моя страница
                    </Text>
                </AppNavigationBar>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <AppInput
                        style={styles.input}
                        value={this.state.login}
                        editable={false}
                        placeholder="Логин"
                        onChangeText={(text) => this.setState({login: text})}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onSubmitEditing={() => this.passwordInput.focus()}
                    />
                    <AppInput
                        style={styles.input}
                        placeholder="Текущий пароль"
                        onChangeText={(text) => this.setState({currentPass: text})}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
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
                        value={this.state.firstName}
                        placeholder="Имя"
                        onChangeText={(text) => this.setState({firstName: text})}
                        autoCorrect={false}
                        reference={(input) => this.nameInput = input}
                        onSubmitEditing={() => this.surnameInput.focus()}
                    />
                    <AppInput
                        style={styles.input}
                        value={this.state.surname}
                        placeholder="Фамилия"
                        onChangeText={(text) => this.setState({surname: text})}
                        autoCorrect={false}
                        reference={(input) => this.surnameInput = input}
                        onSubmitEditing={() => this.middlenameInput.focus()}
                    />
                    <AppInput
                        style={styles.input}
                        value={this.state.middleName}
                        placeholder="Отчество"
                        onChangeText={(text) => this.setState({middleName: text})}
                        autoCorrect={false}
                        reference={(input) => this.middlenameInput = input}
                        onSubmitEditing={() => this.emailInput.focus()}
                    />
                    <AppInput
                        style={styles.input}
                        value={this.state.email}
                        editable={this.state.editable}
                        placeholder="Почта"
                        onChangeText={(text) => this.setState({email: text})}
                        autoCorrect={false}
                        reference={(input) => this.emailInput = input}
                        onSubmitEditing={() => this.cityInput.focus()}
                    />
                    <AppInput
                        style={styles.input}
                        value={this.state.city}
                        placeholder="Город"
                        onChangeText={(text) => this.setState({city: text})}
                        autoCorrect={false}
                        reference={(input) => this.cityInput = input}
                    />
                    <DatePicker
                        style={styles.datePicker}
                        date={this.state.birthDate}
                        mode="date"
                        placeholder="Дата рождения"
                        format="DD-MM-YYYY"
                        confirmBtnText="Подтвердить"
                        cancelBtnText="Отменить"
                        showIcon={false}
                        customStyles={datePickerStyle}
                        onDateChange={(birthDate) => { this.setState({birthDate}); }}
                    />
                    <AppButton
                        style={styles.button}
                        onPress={this._updateUserPage}
                        text="Изменить"
                    />
                    {this.state.inProgress && <ActivityIndicator style={{marginTop: 10}} />}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.feedBackground,
    },
    contentContainer: {
        marginTop: 30,
        paddingBottom: 50,
        justifyContent: 'center',
    },
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
    button: {
        marginHorizontal: 80,
        marginTop: 20,
    },
    datePicker: {
        marginTop: 8,
        marginLeft: 80,
        width: 235,
    },
});

export default UserPageScreen;
