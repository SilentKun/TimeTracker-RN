import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import LoginManager from '../../Helpers/LoginManager';
import {store} from '../../Redux';
import {trackingOn, trackingOff} from '../../Redux/Actions';

class TaskTrackingScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hubConnection: null,
            buttonToggle: true,
        };
    }

    showMessage = (text) => {
        if (text.trim() !== '') {
            alert(text);
        }
    }

    componentDidMount() {
        const token = LoginManager.shared().getToken();
        const hubConnection = new HubConnectionBuilder()
            .withUrl('http://silentkunz-001-site1.dtempurl.com/trackingHub', { accessTokenFactory: () => token })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        this.setState({ hubConnection }, () => {
            this.state.hubConnection.start()
                .catch((err) => console.log(err));

            this.state.hubConnection.on('startTracking', (message, status, obj) => {
                // this.setState({ buttonToggle: false });
                this.showMessage(message);
            });

            this.state.hubConnection.on('stopTracking', (receivedMessage, status) => {
                this.setState({ buttonToggle: true });
                this.showMessage(receivedMessage);
            });

            this.state.hubConnection.on('getActiveTracking', (istracking, worktask, time) => {
                this.setState({ buttonToggle: !istracking });
            });
        });
    }

    invokeFunction = (name) => {
        this.state.hubConnection
            .invoke(name)
            .catch((err) => {
                console.error(err);
                this.setState({ buttonToggle: true });
            });
    };

    invokeFunctionArg = (name, arg) => {
        this.state.hubConnection
            .invoke(name, arg)
            .catch(err => {
                console.error(err);
                this.setState({ buttonToggle: true });
            });
    }

    startTracking = () => {
        this.state.hubConnection
            .invoke('StartTracking', this.props.task.Id)
            .catch((err) => {
                console.error(err);
                this.setState({ buttonToggle: true });
            });
    };

    stopTracking = () => {
        this.invokeFunction('StopTracking');
    };

    render() {
        const {task} = this.props;
        return (
            <View style={{height: 80, width: '100%', backgroundColor: '#FFF' }}>
                <Text>{task?.Title}</Text>
                <TouchableOpacity onPress={this.startTracking}>
                    <Text>Start</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.stopTracking}>
                    <Text>Stop</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default TaskTrackingScreen;
