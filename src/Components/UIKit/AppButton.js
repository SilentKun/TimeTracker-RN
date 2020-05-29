import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../Constants';

const AppButton = ({style, text, onPress, disabled, isDestructive}) => {
    return (
        <TouchableOpacity
            style={{...style, ...styles.button, backgroundColor: isDestructive ? colors.danger : '#03bafc'}}
            disabled={disabled}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 16,
        color: '#fff',
        marginVertical: 15,
        textAlign: 'center',
    },
    button: {
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: '#03bafc',
    },
});

export default AppButton;
