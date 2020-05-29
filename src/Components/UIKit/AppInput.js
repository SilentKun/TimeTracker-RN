import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {colors} from '../../Constants';

const AppInput = ({style, value, placeholder, reference, onChangeText, onSubmitEditing, secureTextEntry, autoFocus}) => {
    return (
        <View style={{...styles.container, ...style}}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                ref={reference}
                secureTextEntry={secureTextEntry}
                autoCorrect={false}
                onSubmitEditing={onSubmitEditing}
                style={styles.input}
                autoFocus={autoFocus}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 52,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: colors.light,
        borderColor: colors.charcoalGrey10,
        borderWidth: 1,
    },
    placeholderContainer: {
        justifyContent: 'center',
        position: 'absolute',
        paddingHorizontal: 16,
        margin: -3,
    },
    label: {
        left: 0,
        color: colors.charcoalGrey,
        opacity: 0.4,
    },
    inputContainer: {
        flex: 1,
        alignSelf: 'flex-end',
        margin: -3,
    },
    input: {
        width: '100%',
        height: '100%',
        fontSize: 14,
        color: colors.charcoalGrey,
        paddingVertical: 0,
        paddingHorizontal: 16,
    },
});

export default AppInput;
