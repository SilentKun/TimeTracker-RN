/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootStackScreen from './Navigation';
import ReduxApp from './Redux';

const App = () => {
    console.disableYellowBox = true;
    return (
        <SafeAreaProvider>
            <StatusBar
                backgroundColor="transparent"
                barStyle="light-content"
                translucent={true}
            />
            <ReduxApp>
                <RootStackScreen />
            </ReduxApp>
        </SafeAreaProvider>
    );
};

export default App;
