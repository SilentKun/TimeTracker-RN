import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {colors} from '../../Constants';
import AppButton from '../UIKit/AppButton';

const MembersCell = ({style, login, right, onPress, onValueChange, selectedValue, onPressDelete, onPressRight, isAdmin, currentUser}) => {
    return (
        <View
            style={{...styles.container, ...style}}
            onPress={onPress}
        >
            <View style={{...styles.mainContainer, width: isAdmin && currentUser.login !== login ? '50%' : '100%'}}>
                <View style={styles.nameContainer}>
                    <Text style={styles.namelabel}>Имя пользователя</Text>
                    <Text style={styles.name}>{login}</Text>
                </View>
                <View style={styles.rightContainer}>
                    <Text style={styles.rightlabel}>Роль</Text>
                    <Text style={styles.right}>{right.Name}</Text>
                </View>
            </View>
            {(isAdmin && currentUser.login !== login) &&
            <View style={styles.buttonContainer}>
                <AppButton
                    textStyle={{marginVertical: 10, marginHorizontal: 10}}
                    onPress={onPressRight}
                    text="Сменить роль"
                />
                <AppButton
                    textStyle={{marginVertical: 10, marginHorizontal: 10}}
                    isDestructive={true}
                    style={{marginTop: 10}}
                    onPress={onPressDelete}
                    text="Исключить"
                />
            </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        backgroundColor: '#FFF',
        elevation: 3,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        // paddingBottom: 10,
        borderRadius: 5,
        flexDirection: 'row',
    },
    mainContainer: {
        flexDirection: 'column',
    },
    buttonContainer: {
        justifyContent: 'center',
        flex: 1,
        paddingLeft: 10,
        borderLeftWidth: 1,
        borderColor: colors.charcoalGrey10,
    },
    namelabel: {
        color: colors.brownGrey,
        fontSize: 12,
        marginTop: 10,
    },
    rightlabel: {
        color: colors.brownGrey,
        fontSize: 12,
        marginTop: 5,
    },
    rightContainer: {
        borderTopWidth: 1,
        borderColor: colors.charcoalGrey10,
    },
    nameContainer: {
        // width: '50%',
        // marginHorizontal: 10,
        marginBottom: 5,
    },
    name: {
        fontSize: 16,
    },
    right: {
        marginBottom: 10,
    },
});

export default MembersCell;
