import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const AppButton = ({style, text, onPress, disabled}) => {
    return (
        <TouchableOpacity style={{...style, ...styles.button}} disabled={disabled} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 16,
        color: '#fff',
        marginVertical: 10,
        textAlign: 'center',
    },
    button: {
        borderRadius: 20,
        marginTop: 25,
        paddingHorizontal: 30,
        justifyContent: 'center',
        backgroundColor: '#03bafc',
    },
});

export default AppButton;
