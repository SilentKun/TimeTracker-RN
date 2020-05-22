import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const CommonCell = ({style, title, description, onPress}) => {
    return (
        <TouchableOpacity
            style={{...styles.container, ...style}}
            onPress={onPress}
        >
            <Text>{title}</Text>
            <Text>{description}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        backgroundColor: '#FFF',
        elevation: 5,
        // width: '100%',
        height: 100,
        borderRadius: 3,
        flexDirection: 'column',
    },

});

export default CommonCell;
