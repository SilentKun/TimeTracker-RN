import React from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import Modal from 'react-native-modal';
import AppButton from './AppButton';

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
                <TextInput
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
        alignItems: 'center',
    },
    background: {
        alignItems: 'center',
        marginHorizontal: 30,
        backgroundColor: '#FFF',
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
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        paddingVertical: 1,
        width: 200,
    },
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 25,
        justifyContent: 'center',
        paddingRight: 10,
    },
    button: {
        marginLeft: 10,
    },
});

export default AppPopup;
