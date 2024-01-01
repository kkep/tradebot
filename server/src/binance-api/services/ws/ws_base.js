"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseWS = void 0;
const base_1 = require("../base");
const WebSocketClient = require("ws");
const rxjs_1 = require("rxjs");
class BaseWS extends base_1.Base {
    constructor(options) {
        super(options);
        this.onMessage$ = new rxjs_1.Subject();
        this.onOpen$ = new rxjs_1.Subject();
        this.callbacks = options.callbacks || {};
        this.reconnectDelay = options.reconnectDelay || 5000;
        this.wsConnection = {};
    }
    isConnected() {
        return !(!this.wsConnection.ws ||
            this.wsConnection.ws.readyState !== WebSocketClient.OPEN);
    }
    initConnect(url) {
        const ws = new WebSocketClient(url);
        this._options.logger.info(`Sending Websocket connection to: ${url}`);
        this.wsConnection.ws = ws;
        this.wsConnection.closeInitiated = false;
        ws.on('open', () => {
            this._options.logger.info(`Connected to the Websocket Server: ${url}`);
            this.callbacks.open && this.callbacks.open(this);
            this.onOpen$.next(this);
        });
        ws.on('message', (data) => {
            this.callbacks.message && this.callbacks.message(data.toString());
            this.onMessage$.next(JSON.parse(data.toString()));
        });
        ws.on('ping', () => {
            this._options.logger.info('Received PING from server');
            this.callbacks.ping && this.callbacks.ping();
            ws.pong();
            this._options.logger.info("Responded PONG to server's PING message");
        });
        ws.on('pong', () => {
            this._options.logger.info('Received PONG from server');
            this.callbacks.pong && this.callbacks.pong();
        });
        ws.on('error', (err) => {
            this._options.logger.error('Received error from server');
            this.callbacks.error && this.callbacks.error();
            this._options.logger.error(err);
        });
        ws.on('close', (closeEventCode, reason) => {
            if (!this.wsConnection.closeInitiated) {
                this.callbacks.close && this.callbacks.close();
                this._options.logger.warn(`Connection close due to ${closeEventCode}: ${reason}.`);
                setTimeout(() => {
                    this._options.logger.debug('Reconnect to the server.');
                    this.initConnect(url);
                }, this.reconnectDelay);
            }
            else {
                this.wsConnection.closeInitiated = false;
            }
        });
    }
    disconnect() {
        if (!this.isConnected()) {
            this._options.logger.warn('No connection to close.');
        }
        else {
            this.wsConnection.closeInitiated = true;
            this.wsConnection.ws.close();
            this._options.logger.info('Disconnected with Binance Websocket Server');
        }
    }
    pingServer() {
        if (!this.isConnected()) {
            this._options.logger.warn('Ping only can be sent when connection is ready.');
        }
        else {
            this._options.logger.info('Send PING to the Websocket Server');
            this.wsConnection.ws.ping();
        }
    }
    send(payload) {
        if (!this.isConnected()) {
            this._options.logger.warn('Send only can be sent when connection is ready.');
        }
        else {
            this.wsConnection.ws.send(payload);
        }
    }
}
exports.BaseWS = BaseWS;
//# sourceMappingURL=ws_base.js.map