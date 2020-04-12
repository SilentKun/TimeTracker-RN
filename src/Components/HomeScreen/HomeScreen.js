import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {LoginHelper} from '../Registration';
import {LoginManager} from '../../Helpers';
import {routes} from '../../Constants';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.loginHelper = new LoginHelper(
            (stateUpdate) => this.setState(stateUpdate),
            () => this.state,
            (params) => this.props.navigation.navigate(params),
        );
        this.state = this.loginHelper.buildInitialState();
    }

    signOut = () => {
        this.setState({inProgress: true});
        LoginManager.shared().signOut(() => {
            this.setState({inProgress: false});
            this.props.navigation.navigate({
                routeName: routes.LoginScreen,
            });
        });
    };

    render() {
        const email = this.props.currentUser?.email;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Hello {email}</Text>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate(routes.LoginScreen); }}>
                    <Text>LogOut</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = ({currentUser}) => {
    return {
        currentUser,
    };
};

export default connect(mapStateToProps, null)(HomeScreen);
