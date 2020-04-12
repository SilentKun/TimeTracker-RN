/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootComponent from './Navigation';
import ReduxApp from './Redux';

const App = () => {
    return (
        <SafeAreaProvider>
            <StatusBar
                backgroundColor="transparent"
                barStyle="light-content"
                translucent={true}
            />
            <ReduxApp>
                <RootComponent />
            </ReduxApp>
        </SafeAreaProvider>
    );
};

export default App;
