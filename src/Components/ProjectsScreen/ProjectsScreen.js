import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {LoginHelper} from '../Registration';
import {LoginManager} from '../../Helpers';
import {routes} from '../../Constants';

class ProjectsScreen extends Component {
    constructor(props) {
        super(props);
        this.loginHelper = new LoginHelper(
            (stateUpdate) => this.setState(stateUpdate),
            () => this.state,
            (params) => this.props.navigation.navigate(params),
        );
        this.state = this.loginHelper.buildInitialState();
    }

    render() {
        const email = this.props.currentUser?.email;
        const {inProgress} = this.state;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Hello {email}</Text>
                {inProgress && <ActivityIndicator style={{marginTop: 10}} />}
            </View>
        );
    }
}

const mapStateToProps = ({currentUser}) => {
    return {
        currentUser,
    };
};

export default connect(mapStateToProps, null)(ProjectsScreen);
