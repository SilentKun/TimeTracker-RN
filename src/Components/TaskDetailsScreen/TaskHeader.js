import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import {colors} from '../../Constants';

const TaskHeader = ({worktask, project, states, valueTask, onValueChange, createdDate}) => {
    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <View style={{width: '50%'}}>
                    <Text style={styles.label}>Проект</Text>
                    <Text style={styles.text}>{project.Title}</Text>
                </View>
                <View style={{flex: 1, paddingLeft: 10, borderLeftWidth: 1, borderColor: colors.charcoalGrey10}}>
                    <Text style={styles.label}>Описание</Text>
                    <Text style={styles.text}>{worktask.Description || '-'}</Text>
                </View>
            </View>
            <View style={styles.rowContainer}>
                <View style={{width: '50%'}}>
                    <Text style={styles.label}>Дата создания</Text>
                    <Text style={styles.text}>{createdDate}</Text>
                </View>
                <View style={{flex: 1, paddingLeft: 10, borderLeftWidth: 1, borderColor: colors.charcoalGrey10}}>
                    <Text style={styles.label}>Часов</Text>
                    <Text style={styles.text}>{worktask.Duration}</Text>
                </View>
            </View>
            <View style={{...styles.rowContainer, borderBottomWidth: 0}}>
                <Text style={styles.label}>Состояние</Text>
            </View>
            <RNPickerSelect
                placeholder={{}}
                value={valueTask}
                onValueChange={onValueChange}
                items={states}
                textInputProps={{marginBottom: 5, fontSize: 16}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        backgroundColor: '#FFF',
        elevation: 5,
        flex: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        flexDirection: 'column',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    rowContainer: {
        borderBottomWidth: 1,
        borderColor: colors.charcoalGrey10,
        flexDirection: 'row',
        // flex: 1,
    },
    leftContainer: {
        marginVertical: 10,
        borderRightWidth: 1,
        borderColor: colors.charcoalGrey10,
        flexDirection: 'row',
    },
    rightContainer: {
        marginVertical: 10,
        flexDirection: 'row',
    },
    label: {
        color: colors.brownGrey,
        fontSize: 14,
        marginTop: 5,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default TaskHeader;
