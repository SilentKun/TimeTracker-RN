import { HubConnectionBuilder, LogLevel, HttpTransportType } from '@microsoft/signalr';

class SignalRHelper {
    static url = 'http://truthofway-001-site1.itempurl.com/trackingHub';

    static logLevel = LogLevel.Information;

    static transports = HttpTransportType.WebSockets || HttpTransportType.LongPolling;

    static serverTimeout = 120000;

    static getConnection(data) {
        const tokenGetter = () => data.token;
        const connection = new HubConnectionBuilder()
            .withUrl(this.url, { accessTokenFactory: tokenGetter, transport: this.transports })
            .configureLogging(this.logLevel)
            .build();
        connection.serverTimeoutInMilliseconds = this.serverTimeout;
        connection.onclose(data.onClose);
        connection.on('getActiveTracking', data.onActiveTrackingReceive);
        return connection;
    }
}

export default SignalRHelper;
