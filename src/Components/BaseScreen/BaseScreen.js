import React, {Component} from 'react';
import {routes} from '../../Constants';
import {LoginManager} from '../../Helpers';

class BaseScreen extends Component {
    constructor(props) {
        super(props);
        LoginManager.build().then((loginManager) => {
            if (loginManager.isLoggedIn()) {
                this.props.navigation.navigate(routes.HomeScreen);
            } else {
                this.props.navigation.navigate(routes.LoginScreen);
            }
        });
    }

    render() {
        return null;
    }
}

export default BaseScreen;
