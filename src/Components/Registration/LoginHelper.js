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
        LoginManager.shared().signIn(login, password, (error, response) => {
            if (error) {
                this.setState({inProgress: false});
                alert(error);
            } else {
                this.setState({inProgress: false});
                this.navigate({
                    routeName: routes.HomeScreen,
                    params: {login: response.email},
                });
            }
        });
    };

    signUp = () => {
        const {login, password} = this.getState();
        this.setState({inProgress: true});
        LoginManager.shared().signUp(login, password, (error, response) => {
            if (error) {
                this.setState({inProgress: false});
                alert(error);
            } else {
                this.setState({inProgress: false});
                this.navigate({
                    routeName: routes.HomeScreen,
                    params: {login: response.email},
                });
            }
        });
    };
}

export default LoginHelper;
