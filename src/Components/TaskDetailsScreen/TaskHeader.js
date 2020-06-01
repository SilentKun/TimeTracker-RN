import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-community/picker';

import {colors} from '../../Constants';

const offset = moment().utcOffset();

const TaskHeader = ({worktask, project, states, valueTask, onValueChange}) => {
    const createdDate = moment(worktask.CreatedDate).add(offset, 'm').format('L');
    console.log('STAFDSFTE', states);
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
            <Picker
                selectedValue={valueTask}
                style={{height: 40}}
                onValueChange={onValueChange}
            >
                {states.map((item, index) => (
                    <Picker.Item key={index} label={item.label} value={item.value} />
                ))}
            </Picker>
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
        // width: '100%',
        // height: '20%',
        borderRadius: 5,
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
        flexDirection: 'column',
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
