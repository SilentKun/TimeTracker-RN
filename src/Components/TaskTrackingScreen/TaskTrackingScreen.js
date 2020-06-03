import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginManager from '../../Helpers/LoginManager';
import {store} from '../../Redux';
import {trackingOn, trackingOff} from '../../Redux/Actions';
import Timer from './Timer';
import {SignalRHelper} from '../../Helpers';
import AppTouchableIcon from '../UIKit/AppTouchableIcon';

class TaskTrackingScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hubConnection: null,
            buttonToggle: true,
            time: undefined,
            isTracked: false,
            offset: moment().utcOffset(),
        };
    }

    showMessage = (text) => {
        if (text.trim() !== '') {
            alert(text);
        }
    };

    async start() {
        const { hubConnection } = this.state;

        try {
            await hubConnection.start();
        } catch (err) {
            console.log(err);
            setTimeout(() => this.start(), 5000);
        }
    }

    onClose = async (error) => {
        await this.start();
    };

    componentWillUnmount() {
        this.state.hubConnection.off('getActiveTracking');
    }

    onActiveTrackingReceive = (istracking, worktask, started, message) => {
        this.showMessage(message);
        if (!istracking) {
            this.setState({
                isTracked: false,
                worktask: {},
                time: {},
            });
            return;
        }

        let startTime;
        if (started) {
            startTime = moment(worktask.startedTime).utcOffset(this.state.offset);
        } else {
            startTime = moment(worktask.startedTime).add(this.state.offset, 'm');
        }
        this.setState({
            isTracked: istracking,
            worktask,
            time: startTime,
        });
    };

    componentDidMount() {
        const token = LoginManager.shared().getToken();
        const connectionData = {
            token,
            onClose: this.onClose,
            onActiveTrackingReceive: this.onActiveTrackingReceive,
        };

        const hubConnection = SignalRHelper.getConnection(connectionData);

        this.setState({ hubConnection }, () => {
            this.start();
        });
    }

    startTracking = () => {
        this.state.hubConnection
            .invoke('StartTracking', this.props.task.Id)
            .catch((err) => {
                console.error(err);
                this.setState({ buttonToggle: false });
            });
    };

    stopTracking = () => {
        this.state.hubConnection
            .invoke('StopTracking')
            .catch((err) => {
                console.error(err);
                this.setState({ buttonToggle: true });
            });
        // store.dispatch(trackingOff());
    };

    render() {
        const {task} = this.props;
        return (
            <View style={styles.container}>
                <Text>{task?.Title}</Text>
                {this.state.isTracked ?
                    <Timer isTracked={this.state.isTracked} start={this.state.time} /> : <Text>00:00:00</Text>}
                <View style={{alignItems: 'flex-end', justifyContent: 'center', flex: 1, marginRight: 25}}>
                    {this.state.isTracked ?
                        <TouchableOpacity onPress={this.stopTracking}>
                            <Icon style={{marginLeft: 17}} name={'stop-circle'} size={62} color="#03bafc" />
                        </TouchableOpacity>
                        :
                        <AppTouchableIcon
                            fontSize={66}
                            tintColor="#03bafc"
                            style={styles.icon}
                            icon="ios-play-circle"
                            onPress={this.startTracking}
                        />
                    }
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        width: '100%',
        backgroundColor: '#FFF',
        flexDirection: 'row',
    },
    listHeaderComponent: {
        // height: '20%',
        marginHorizontal: 10,
        marginTop: 10,
    },
    contentContainer: {
        paddingBottom: 30,

    },
    icon: {

    },
    flexSpacing: {
        flex: 1,
    },
    addIcon: {
        width: 55,
    },
    title: {
        marginLeft: 20,
        fontSize: 17,
        letterSpacing: 0.15,
        color: '#FFF',
        // width: '70%',
    },
});

export default TaskTrackingScreen;
