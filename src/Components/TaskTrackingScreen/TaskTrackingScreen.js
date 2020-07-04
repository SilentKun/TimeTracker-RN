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
import {colors} from '../../Constants';
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
            });
    };

    stopTracking = () => {
        this.state.hubConnection
            .invoke('StopTracking')
            .catch((err) => {
                console.error(err);
            });
    };

    render() {
        const {task} = this.props;
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'column', marginLeft: 25}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 16}}>Задача: </Text>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{fontSize: 16, fontWeight: 'bold', width: '40%'}}
                        >
                            {task?.Title}
                        </Text>
                    </View>
                    {this.state.isTracked ?
                        <Timer
                            style={styles.timer}
                            isTracked={this.state.isTracked}
                            start={this.state.time}
                        /> : <Text style={styles.timer}>00:00:00</Text>}
                </View>
                <View style={{alignItems: 'center', flexDirection: 'row', marginRight: 25}}>
                    <TouchableOpacity onPress={() => {
                        if (this.state.isTracked) {
                            this.stopTracking();
                        }
                        setTimeout(() => {
                            store.dispatch(trackingOff());
                        }, 500);
                    }}
                    >
                        <Text style={{paddingVertical: 30, color: '#03bafc'}}>Закрыть</Text>
                    </TouchableOpacity>
                    {this.state.isTracked ?
                        <TouchableOpacity onPress={this.stopTracking}>
                            <Icon style={{marginLeft: 17}} name="stop-circle" size={62} color="#f44236" />
                        </TouchableOpacity>
                        :
                        <AppTouchableIcon
                            fontSize={66}
                            tintColor="#03bafc"
                            style={styles.icon}
                            icon="ios-play-circle"
                            onPress={() => {
                                setTimeout(() => {
                                    this.startTracking();
                                }, 500);
                            }}
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
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 15,
        borderTopWidth: 1,
        borderColor: colors.charcoalGrey10,
    },
    timer: {
        fontSize: 34,
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
