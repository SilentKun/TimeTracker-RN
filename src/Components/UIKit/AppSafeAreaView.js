import React, {PureComponent} from 'react';
import {View, StatusBar, Keyboard, Platform} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {isIos, OSVersion} from '../../Constants';

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
