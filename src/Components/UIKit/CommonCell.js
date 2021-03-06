import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../Constants/colors';
import AppButton from './AppButton';

const CommonCell = ({
    style,
    Title,
    Description,
    onPressAccept,
    onLongPress,
    isPending,
    onPressDecline,
    State,
    onPress,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{...styles.container, ...style}}
            onLongPress={onLongPress}
        >
            <View style={styles.containerText}>
                <Text style={styles.text}>{Title}</Text>
            </View>
            <View style={{...styles.bottomContainer, width: isPending ? '40%' : '100%'}}>
                <View style={{...styles.descriptionContainer, width: State ? '50%' : '100%'}}>
                    <Text style={styles.descriptionLabel}>Описание</Text>
                    <Text style={styles.description}>{Description || '-'}</Text>
                </View>
                {State &&
                <View style={styles.stateContainer}>
                    <Text style={{...styles.descriptionLabel, marginLeft: 5}}>Состояние</Text>
                    <View style={styles.tagView}>
                        <Text style={{...styles.description, color: '#fff'}}>{State.Title}</Text>
                    </View>
                </View>}
            </View>
            {isPending &&
            <View>
                <AppButton
                    textStyle={{marginVertical: 10, marginHorizontal: 10}}
                    onPress={onPressAccept}
                    style={{position: 'absolute', right: 105, bottom: 5}}
                    text="Принять"
                />
                <AppButton
                    textStyle={{marginVertical: 10, marginHorizontal: 10}}
                    isDestructive={true}
                    style={{position: 'absolute', right: 0, bottom: 5}}
                    onPress={onPressDecline}
                    text="Отклонить"
                />
            </View>}
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
    tagView: {
        marginLeft: 5,
        marginTop: 5,
        paddingHorizontal: 5,
        width: '100%',
        backgroundColor: '#03bafc',
        borderRadius: 6,
        alignItems: 'center',
    },
    descriptionLabel: {
        color: colors.brownGrey,
        fontSize: 12,
        marginTop: 5,
    },
    bottomContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        position: 'absolute',
        flexDirection: 'row',
        right: 10,
        bottom: 0,
    },
    container: {
        marginBottom: 10,
        backgroundColor: '#FFF',
        elevation: 3,
        marginHorizontal: 10,
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
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    containerText: {
        borderColor: colors.charcoalGrey10,
        borderBottomWidth: 1,
    },
    descriptionContainer: {
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
