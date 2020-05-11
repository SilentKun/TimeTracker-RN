import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AppTouchableIcon = ({style, icon, onPress, disabled, tintColor = '#FFF'}) => {
    return (
        <TouchableOpacity
            style={{...styles.container, ...style}}
            onPress={onPress}
            disabled={disabled}
        >
            <Icon style={{marginLeft: 17}} name={icon} size={30} color={tintColor} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    icon: {
        width: 24,
        height: 24,
    },
});

export default AppTouchableIcon;
