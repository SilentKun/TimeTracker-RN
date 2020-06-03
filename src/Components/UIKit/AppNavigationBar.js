import React from 'react';
import {StyleSheet, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

const AppNavigationBar = ({style, children}) => {
    return (
        <View style={{...styles.container, ...style}}>
            <SafeAreaView style={styles.statusBar} />
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
