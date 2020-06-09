import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../Constants';

const WorktrackCell = ({style, User, onLongPress, startedTime, stoppedTime, TotalTime, Task}) => {
    return (
        <View
            style={{...styles.container, ...style}}
            onLongPress={onLongPress}
        >
            <View style={styles.userContainer}>
                <View style={{flexDirection: 'column'}}>
                    <Text style={styles.userLabel}>Пользователь</Text>
                    <Text style={styles.text}>{User}</Text>
                </View>
                {Task &&
                <View style={styles.taskContainer}>
                    <Text style={styles.userLabel}>Задача</Text>
                    <Text style={styles.text}>{Task}</Text>
                </View>}
            </View>
            <View style={styles.bottomContainer}>
                <View>
                    <Text style={styles.timeLabel}>Время начала</Text>
                    <Text style={styles.time}>{startedTime}</Text>
                </View>
                <View style={{...styles.timeContainer, ...styles.timeStyle}}>
                    <Text style={styles.timeLabel}>Время конца</Text>
                    <Text style={styles.time}>{stoppedTime}</Text>
                </View>
                <View style={{...styles.timeContainer, ...styles.timeStyle}}>
                    <Text style={styles.timeLabel}>Затраченное время</Text>
                    <Text style={styles.time}>{TotalTime}</Text>
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    userLabel: {
        color: colors.brownGrey,
        fontSize: 12,
        marginTop: 5,
    },
    timeLabel: {
        color: colors.brownGrey,
        fontSize: 12,
        marginTop: 5,
    },
    taskContainer: {
        flexDirection: 'column',
        borderLeftWidth: 1,
        borderColor: colors.charcoalGrey10,
        paddingLeft: 5,
    },
    bottomContainer: {
        flexDirection: 'row',
    },
    container: {
        marginBottom: 10,
        backgroundColor: '#FFF',
        elevation: 3,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        flexDirection: 'column',
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    userContainer: {
        flexDirection: 'row',
        borderColor: colors.charcoalGrey10,
        borderBottomWidth: 1,
        justifyContent: 'space-between',
    },
    timeContainer: {
    },
    time: {
        fontSize: 16,
        marginBottom: 5,
    },
    icon: {
        position: 'absolute',
        bottom: 5,
        right: 5,
    },
    stateContainer: {
        borderLeftWidth: 1,
        borderColor: colors.charcoalGrey10,
    },
    stateDescription: {
        marginLeft: 5,
    },
    timeStyle: {
        borderLeftWidth: 1,
        borderColor: colors.charcoalGrey10,
        marginLeft: 10,
        paddingLeft: 5,
    }
});

export default WorktrackCell;
