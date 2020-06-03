import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import moment from 'moment';

class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            elapsed: 0,
        };
    }

    componentDidMount() {
        this.timer = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick = () => {
        this.setState({ elapsed: moment().utc() - this.props.start });
    };

    render() {
        const displayTime = moment(this.state.elapsed).utc();
        return (
            <Text style={{...styles.timer, ...this.props.style}}>{displayTime.format('HH:mm:ss')}</Text>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#03bafc',
    },
    contentContainer: {
        flexDirection: 'row',
        height: 56,
        alignItems: 'center',
    },
    timer: {
        fontSize: 32,
    },
    statusBar: {},
});

export default Timer;
