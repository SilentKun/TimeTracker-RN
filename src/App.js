/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Text, StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
    return (
        <SafeAreaProvider>
            <StatusBar
                backgroundColor="transparent"
                barStyle="light-content"
                translucent={true}
            />
            <Text>Initial commit</Text>
        </SafeAreaProvider>
    );
};

export default App;
