import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../Constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const CommonCell = ({style, Title, Description, onPress, login, onLongPress, isPending}) => {
    if (!Description) {
        return (
            <TouchableOpacity
                style={{...styles.titleCard, ...style}}
                onPress={onPress}
                onLongPress={onLongPress}
            >
                <View style={styles.containerText}>
                    <Text style={styles.text}>{Title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
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
            <View style={styles.descriptionContainer}>
                <Text style={styles.description}>{Description}</Text>
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
    container: {
        marginBottom: 10,
        backgroundColor: '#FFF',
        elevation: 3,
        marginHorizontal: 10,
        paddingBottom: 10,
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
        marginHorizontal: 10,
    },
    descriptionContainer: {
        marginHorizontal: 10,
        borderColor: colors.charcoalGrey10,
        borderTopWidth: 1,
    },
    description: {
        fontSize: 16,
        marginTop: 10,
        marginRight: 10,
    },
    icon: {
        position: 'absolute',
        bottom: 5,
        right: 5,
    }
});

export default CommonCell;
