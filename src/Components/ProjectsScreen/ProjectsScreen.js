import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {DrawerActions} from 'react-navigation-drawer';
import {LoginHelper} from '../Registration';
import {LoginManager} from '../../Helpers';
import {routes} from '../../Constants';
import {AppNavigationBar, AppTouchableIcon} from '../UIKit';

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

    onMenuPress = () => {
        this.props.navigation.dispatch(DrawerActions.openDrawer());
    };

    render() {
        const email = this.props.currentUser?.email;
        const {inProgress} = this.state;
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <AppNavigationBar style={styles.navigationBar}>
                    <AppTouchableIcon
                        style={styles.menuIcon}
                        icon="ios-menu"
                        onPress={this.onMenuPress}
                    />
                    <Text style={styles.title}>
                        Projects
                    </Text>
                </AppNavigationBar>
                <Text>Projects List</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navigationBar: {
        width: '100%',
    },
    title: {
        marginLeft: 20,
        fontSize: 17,
        letterSpacing: 0.15,
        color: '#FFF',
    },
    menuIcon: {
    },
});

export default connect(mapStateToProps, null)(ProjectsScreen);
