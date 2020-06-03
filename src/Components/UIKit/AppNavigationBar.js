import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppSafeAreaView from './AppSafeAreaView';

const AppNavigationBar = ({style, children}) => {
    return (
        <View style={{...styles.container, ...style}}>
            <AppSafeAreaView style={styles.statusBar} />
            <View style={styles.contentContainer}>

                {children}

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#03bafc',
    },
    contentContainer: {
        flexDirection: 'row',
        height: 56,
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,
    },
    statusBar: {},
});

export default AppNavigationBar;
