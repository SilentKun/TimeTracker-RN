import React, { Component } from 'react';
import {
    View,
    Text,
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
            <View>
                <Text>{displayTime.format('HH:mm:ss')}</Text>
            </View>
        );
    }
}

export default Timer;
