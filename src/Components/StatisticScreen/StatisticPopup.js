import React from 'react';
import {StyleSheet, View, TextInput, Text, ScrollView} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-datepicker';
import AppButton from '../UIKit/AppButton';
import {colors} from '../../Constants';

const datePickerStyle = {
    dateInput: {
        backgroundColor: colors.light,
        borderRadius: 10,
        height: 52,
        borderColor: colors.charcoalGrey10,
        alignItems: 'flex-start',
    },
    placeholderText: {
        color: '#9f9f9f',
        fontSize: 14,
        paddingHorizontal: 16,
    },
    dateText: {
        marginLeft: 15,
    },
};

const StatisticPopup = ({
    isPopupStatVisible,
    submit,
    closeDialog,
    onChangeProject,
    onChangeUser,
    onChangeTask,
    projectValue,
    taskValue,
    userValue,
    projects,
    users,
    tasks,
    onFromDateChange,
    onEndDateChange,
    fromDate,
    endDate,
}) => {
    return (
        <Modal
            isVisible={isPopupStatVisible}
            style={styles.container}
        >
            <View style={styles.background}>
                <Text style={styles.title}>Заполните поля</Text>
                <RNPickerSelect
                    placeholder={{label: 'Выберите проект', value: null}}
                    value={projectValue}
                    onValueChange={onChangeProject}
                    items={projects}
                />
                <RNPickerSelect
                    placeholder={{label: 'Выберите пользователя', value: null}}
                    value={userValue}
                    onValueChange={onChangeUser}
                    items={users}
                />
                <RNPickerSelect
                    style={styles.picker}
                    placeholder={{label: 'Выберите задачу', value: null}}
                    value={taskValue}
                    onValueChange={onChangeTask}
                    items={tasks}
                />
                <DatePicker
                    style={styles.datePicker}
                    date={fromDate}
                    mode="date"
                    placeholder="С"
                    format="YYYY-MM-DD"
                    confirmBtnText="Подтвердить"
                    cancelBtnText="Отменить"
                    showIcon={false}
                    customStyles={datePickerStyle}
                    onDateChange={onFromDateChange}
                />
                <DatePicker
                    style={styles.datePicker}
                    date={endDate}
                    mode="date"
                    placeholder="По"
                    format="YYYY-MM-DD"
                    confirmBtnText="Подтвердить"
                    cancelBtnText="Отменить"
                    showIcon={false}
                    customStyles={datePickerStyle}
                    onDateChange={onEndDateChange}
                />
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
    datePicker: {
        marginTop: 15,
        marginLeft: 80,
        // width: 235,
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

export default StatisticPopup;
