import {routes} from '../../Constants';
import {LoginManager} from '../../Helpers';

class LoginHelper {
    constructor(setState, getState, navigate) {
        this.setState = setState;
        this.getState = getState;
        this.navigate = navigate;
    }

    buildInitialState = () => {
        return {
            inProgress: false,
            birthdate: '',
        };
    };

    signIn = () => {
        const {Login, Pass} = this.getState();
        this.setState({inProgress: true});
        const currentUser = {
            Login,
            Pass,
        };
        LoginManager.shared().signIn(currentUser, (error, response) => {
            if (error) {
                this.setState({inProgress: false});
                alert(error);
            } else {
                this.setState({inProgress: false});
                this.navigate({
                    routeName: routes.HomeStack,
                    params: {login: response.login, avatar: response.avatar},
                });
            }
        });
    };

    signUp = () => {
        const {login, password, email, name, surname, middlename, city, birthdate} = this.getState();
        this.setState({inProgress: true});
        const currentUser = {
            login,
            password,
            email,
            name,
            surname,
            middlename,
            city,
            birthdate,
        };
        LoginManager.shared().signUp(currentUser, (error, response) => {
            if (error) {
                this.setState({inProgress: false});
                alert(error);
            } else {
                this.setState({inProgress: false});
                this.navigate({
                    routeName: routes.HomeStack,
                    params: {login: response.login},
                });
            }
        });
    };
}

export default LoginHelper;
