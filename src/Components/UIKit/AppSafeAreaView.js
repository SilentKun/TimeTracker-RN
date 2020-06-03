import React, {PureComponent} from 'react';
import {View, StatusBar, Keyboard, Platform} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

export const isIos = Platform.OS === 'ios';
export const OSVersion = isIos ? parseInt(Platform.Version, 10) : Platform.Version;

class AppSafeAreaView extends PureComponent {
    render() {
        const {onlyBottom = false, hasKeyboard} = this.props;
        if (isIos && OSVersion >= 11) {
            const forceInset = onlyBottom ? { bottom: hasKeyboard ? 0 : 'always', top: 'never' } : null;
            return (
                <SafeAreaView forceInset={forceInset} {...this.props} />
            );
        }
        const paddingTop = onlyBottom ? 0 : (isIos ? 20 : StatusBar.currentHeight);
        return (
            <View {...this.props} style={{paddingTop, ...this.props?.style}} />
        );
    }
}

export default AppSafeAreaView;
