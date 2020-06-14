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
        };
    };

    signIn = () => {
        const {login, password} = this.getState();
        this.setState({inProgress: true});
        const currentUser = {
            login,
            password,
        };
        LoginManager.shared().signIn(currentUser, (error, response) => {
            if (error) {
                this.setState({inProgress: false});
                alert(error);
            } else {
                this.setState({inProgress: false});
                this.navigate({
                    routeName: routes.HomeStack,
                    params: {login},
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
                alert(response.message)
                this.setState({inProgress: false});
                this.navigate({
                    routeName: routes.LoginScreen,
                });
            }
        });
    };
}

export default LoginHelper;
