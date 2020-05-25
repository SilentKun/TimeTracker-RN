import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    StyleSheet,
    ScrollView,
} from 'react-native';
import {DrawerActions} from 'react-navigation-drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {routes} from '../../Constants';
import MenuCell from './MenuCell';
import {LoginManager} from '../../Helpers';

const menuItems = [
    {
        title: 'Projects',
        iconName: 'ios-paper',
        route: routes.ProjectsScreen,
    },
];

const logoutButton = {
    title: 'Logout',
    iconName: 'md-exit',
    route: routes.LoginScreen,
};

class SideMenu extends Component {
    state = {
        inProgress: false,
    };

    openScreen = (route, params) => {
        this.props.navigation.navigate(route, params);
        this.props.navigation.dispatch(DrawerActions.closeDrawer());
    };

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
        const {currentUser} = this.props;
        const userImage = {source: require('./img/avatar.png')};
        return (
            <SafeAreaView>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <TouchableWithoutFeedback
                        onPress={() => {
                            console.log('UserProfile:', currentUser);
                        }}
                    >
                        <View style={styles.userContainer}>
                            <Image
                                style={styles.userImage}
                                {...userImage}
                                resizeMode="cover"
                            />
                            <Text style={styles.userName}>
                                {currentUser.login}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.separator} />
                    {menuItems.map((cell, index) => (
                        <MenuCell
                            key={index.toString()}
                            {...cell}
                            onPress={() => {
                                this.openScreen(cell.route);
                            }}
                        />
                    ))}
                    <View style={styles.separator} />
                    <MenuCell
                        {...logoutButton}
                        onPress={this.signOut}
                    />
                </ScrollView>
            </SafeAreaView>
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
        // backgroundColor: colors.appDark,
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {},
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: '#e8e8e8',
    },
    userContainer: {
        width: '100%',
    },
    userImage: {
        marginTop: 19,
        marginLeft: 15,
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    userName: {
        marginLeft: 15,
        marginTop: 16,
        marginRight: 10,
        marginBottom: 22,
        fontSize: 17,
        lineHeight: 20,
        letterSpacing: 0.15,
        // color: colors.white,
        flexShrink: 1,
    },
    sectionContainer: {
        paddingVertical: 6,
    },
    footerContainer: {},
    footerText: {
        marginLeft: 17,
        marginTop: 10,
        marginRight: 10,
        marginBottom: 15,
        fontSize: 13,
        lineHeight: 24,
        // color: colors.gray_384C54,
        flexShrink: 1,
    },
});

export default connect(mapStateToProps, null)(SideMenu);
