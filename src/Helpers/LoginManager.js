import * as Keychain from 'react-native-keychain';
import {store} from '../Redux';
import {logInUser as saveUserRedux, logOutUser as deleteUserRedux, trackingOff, updateUser} from '../Redux/Actions';
import {saveUser, readUser, clearUser} from './FileSystemHelper';
import {signInRequest, signUpRequest} from '../Networking';

class LoginManager {
    static __instance = null;

    __user = null;

    __token = null;

    isLoggedIn() {
        return this.__user !== null && this.__token !== null;
    }

    getToken() {
        return this.__token;
    }

    getUser() {
        return this.__user;
    }

    async __restoreSession() {
        const user = await readUser();
        const credentials = await Keychain.getGenericPassword();
        if (user && credentials.password) {
            this._saveUserData(user, credentials.password);
            store.dispatch(saveUserRedux(user));
        } else {
            store.dispatch(deleteUserRedux());
        }
        return user !== null;
    }

    static async build() {
        const manager = LoginManager.shared(); // create instance
        await manager.__restoreSession(); // restore user and token
        return manager; // return manager for usage
    }

    // Instance

    static shared() {
        if (!this.__instance) {
            this.__instance = new LoginManager();
        }
        return this.__instance;
    }

    _saveUserIntoFile = (userModel, block) => {
        const {user} = userModel;
        saveUser(user)
            .then(() => {
                store.dispatch(updateUser(user));
                this._saveUserData(user, userModel.access_token);
                block(null, user);
            })
            .catch((error) => {
                block(error, null);
            });
    };

    signIn = (currentUser, block) => {
        const {login, password} = currentUser;
        signInRequest({
            Login: login,
            Pass: password,
        }, this._handleUserResponse(block));
    };

    signUp = (currentUser, block) => {
        signUpRequest({
            Login: currentUser.login,
            Email: currentUser.email,
            Pass: currentUser.password,
            FirstName: currentUser.name,
            Surname: currentUser.surname,
            MiddleName: currentUser.middlename,
            City: currentUser.city,
            BirthDate: currentUser.birthdate,
        }, block);
    };

    _handleUserResponse = (block) => {
        return (error, response) => {
            if (error) {
                block(error, null);
            } else if (response) {
                const {user} = response;
                this._saveTokenIntoKeychain(user.login, response.access_token, (err) => {
                    if (err) {
                        block(err, null);
                    } else {
                        this._saveUserIntoFile(response, block);
                    }
                });
            }
        };
    };

    _saveTokenIntoKeychain = (username, token, block) => {
        Keychain.setGenericPassword(username, token)
            .then(() => {
                block(null, token);
            })
            .catch((error) => {
                block(error, null);
            });
    };


    clearUserSession = (block) => {
        this.__user = null;
        this.__token = null;
        Keychain.resetGenericPassword()
            .then(() => {
                clearUser()
                    .then(() => {
                        block();
                        store.dispatch(deleteUserRedux());
                    })
                    .catch(() => {
                        block();
                    });
            });
    };

    signOut = (block) => {
        this.clearUserSession((error) => {
            if (error) {
                alert(error);
            }
            block();
            store.dispatch(trackingOff());
        });
    };

    _saveUserData = (user, token) => {
        this.__user = user;
        this.__token = token;
    };
}

export default LoginManager;
