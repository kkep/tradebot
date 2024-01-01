"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiWS = void 0;
const ws_base_1 = require("../ws_base");
const node_crypto_1 = require("node:crypto");
const utils_1 = require("../../../helpers/utils");
class ApiWS extends ws_base_1.BaseWS {
    constructor(options) {
        super(options);
        this._options.wsURL =
            options.wsURL || 'wss://ws-api.binance.com:443/ws-api/v3';
        this.initConnect(this._options.wsURL);
    }
    sendMessageWithAPIKey(method, options = {}) {
        if (!this.isConnected()) {
            this._options.logger.error('Not connected');
            return;
        }
        const id = options.id || (0, utils_1.randomString)();
        options.apiKey = this._options.apiKey;
        delete options.id;
        const payload = {
            id,
            method,
            params: (0, utils_1.removeEmptyValue)(options),
        };
        this._options.logger.debug('Send message to Binance Websocket API Server:', payload);
        this.send(JSON.stringify(payload));
    }
    sendMessage(method, options = {}) {
        if (!this.isConnected()) {
            this._options.logger.error('Not connected');
            return;
        }
        const id = options.id || (0, utils_1.randomString)();
        delete options.id;
        const payload = {
            id,
            method,
            params: (0, utils_1.removeEmptyValue)(options),
        };
        this._options.logger.debug('Send message to Binance Websocket API Server:', payload);
        this.send(JSON.stringify(payload));
    }
    sendSignatureMessage(method, options = {}) {
        if (!this.isConnected()) {
            this._options.logger.error('Not connected');
            return;
        }
        const id = options.id || (0, utils_1.randomString)();
        delete options.id;
        options = (0, utils_1.removeEmptyValue)(options);
        options.apiKey = this._options.apiKey;
        options.timestamp = Date.now();
        options = (0, utils_1.sortObject)(options);
        options.signature = node_crypto_1.default
            .createHmac('sha256', this._options.apiSecret)
            .update((0, utils_1.buildQueryString)(options))
            .digest('hex');
        const payload = {
            id,
            method,
            params: options,
        };
        this._options.logger.debug('Send message to Binance Websocket API Server:', payload);
        this.send(JSON.stringify(payload));
    }
}
exports.ApiWS = ApiWS;
//# sourceMappingURL=ws_api.js.map