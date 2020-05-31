import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../Constants/colors';

const CommonCell = ({style, Title, Description, onPress, login, onLongPress, isPending, State}) => {
    return (
        <TouchableOpacity
            style={{...styles.container, ...style}}
            onPress={onPress}
            onLongPress={onLongPress}
        >
            {isPending && <Icon style={styles.icon} name="ios-add-circle" size={30} color={colors.freshGreen} />}
            <View style={styles.containerText}>
                <Text style={styles.text}>{Title}</Text>
            </View>
            <View style={styles.bottomContainer}>
                <View style={{...styles.descriptionContainer, width: State ? '50%' : '100%'}}>
                    <Text style={styles.descriptionLabel}>Описание</Text>
                    <Text style={styles.description}>{Description || '-'}</Text>
                </View>
                {State &&
                <View style={styles.stateContainer}>
                    <Text style={{...styles.descriptionLabel, marginLeft: 5}}>Состояние</Text>
                    <Text style={{...styles.description, marginLeft: 5}}>{State.Title}</Text>
                </View>}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    titleCard: {
        marginBottom: 10,
        backgroundColor: '#FFF',
        elevation: 3,
        marginHorizontal: 10,
        borderRadius: 5,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    descriptionLabel: {
        color: colors.brownGrey,
        fontSize: 12,
        marginTop: 5,
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
        // paddingBottom: 10,
        borderRadius: 5,
        flexDirection: 'column',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    containerText: {
        // marginHorizontal: 10,
        borderColor: colors.charcoalGrey10,
        borderBottomWidth: 1,
    },
    descriptionContainer: {
        // width: '50%',
        // marginHorizontal: 10,
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
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
});

export default CommonCell;
