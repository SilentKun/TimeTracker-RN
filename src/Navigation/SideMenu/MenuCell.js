import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const MenuCell = ({style, title, iconName, onPress}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{...styles.container, ...style}}
        >
            <Icon style={styles.icon} name={iconName} size={30} color="#03bafc" />
            <Text style={styles.text}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
    },
    icon: {
        marginLeft: 17,
        width: 25,
    },
    text: {
        marginLeft: 33,
        marginRight: 10,
        marginVertical: 13,
        fontSize: 15,
        lineHeight: 20,
        letterSpacing: 0.25,
        // color: colors.white_087,
        flexWrap: 'wrap',
        flexShrink: 1,
    },
});

export default MenuCell;
