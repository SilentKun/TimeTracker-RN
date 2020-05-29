import React from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import Modal from 'react-native-modal';
import AppButton from './AppButton';
import AppInput from './AppInput';
import {colors} from '../../Constants';

const AppPopup = ({
    isDialogVisible,
    submit,
    closeDialog,
    title,
    message,
    onChangeFirstText,
    onChangeSecondText,
    onChangeThirdText,
    firstHintInput,
    secondHintInput,
    thirdHintInput,
}) => {
    return (
        <Modal isVisible={isDialogVisible} style={styles.container}>
            <View style={styles.background}>
                {title && <Text style={styles.title}>{title}</Text>}
                {message && <Text style={styles.message}>{message}</Text>}
                {onChangeFirstText &&
                    <AppInput
                        placeholder={firstHintInput}
                        onChangeText={onChangeFirstText}
                        style={styles.input}
                    />}
                {onChangeSecondText &&
                <TextInput
                    placeholder={secondHintInput}
                    onChangeText={onChangeSecondText}
                    style={styles.input}
                />}
                {onChangeThirdText &&
                <TextInput
                    placeholder={thirdHintInput}
                    onChangeText={onChangeThirdText}
                    style={styles.input}
                />
                }
                <View style={styles.buttonsContainer}>
                    <AppButton style={styles.button} text="OK" onPress={submit} />
                    <AppButton style={styles.button} text="ОТМЕНА" onPress={closeDialog} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
    },
    background: {
        // alignItems: 'center',
        marginHorizontal: 30,
        backgroundColor: colors.feedBackground,
        borderRadius: 20,
    },
    title: {
        marginTop: 15,
        fontSize: 18,
        textAlign: 'center',
        marginHorizontal: 10,
        fontWeight: 'bold',
    },
    message: {
        marginTop: 15,
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 10,
        marginBottom: 10,
    },
    input: {
        marginTop: 10,
        marginHorizontal: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 25,
        justifyContent: 'center',
    },
    button: {
        marginTop: 25,
        marginLeft: 10,
        paddingHorizontal: 35,
    },
});

export default AppPopup;
