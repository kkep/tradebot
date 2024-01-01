"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamWS = void 0;
const ws_base_1 = require("../ws_base");
const common_1 = require("@nestjs/common");
let StreamWS = class StreamWS extends ws_base_1.BaseWS {
    constructor(options) {
        super(options);
        this._options.wsURL = options.wsURL || 'wss://stream.binance.com:9443';
        this._options.combinedStreams = options.combinedStreams || false;
    }
    _prepareURL(stream) {
        let url = `${this._options.wsURL}/ws/${stream}`;
        if (this._options.combinedStreams) {
            url = `${this._options.wsURL}/stream?streams=${stream}`;
        }
        return url;
    }
    subscribe(stream) {
        if (!this.isConnected()) {
            const url = this._prepareURL(stream);
            this.initConnect(url);
        }
        else {
            if (!Array.isArray(stream)) {
                stream = [stream];
            }
            const payload = {
                method: 'SUBSCRIBE',
                params: stream,
                id: Date.now(),
            };
            this._options.logger.info('SUBSCRIBE', payload);
            this.send(JSON.stringify(payload));
        }
    }
    getSubscriptions() {
        const payload = {
            method: 'LIST_SUBSCRIPTIONS',
            id: Date.now(),
        };
        this._options.logger.info('LIST_SUBSCRIPTIONS', payload);
        this.send(JSON.stringify(payload));
    }
    unsubscribe(stream) {
        if (!this.isConnected()) {
            this._options.logger.warn('Not connected');
        }
        else {
            if (!Array.isArray(stream)) {
                stream = [stream];
            }
            const payload = {
                method: 'UNSUBSCRIBE',
                params: stream,
                id: Date.now(),
            };
            this._options.logger.info('UNSUBSCRIBE', payload);
            this.send(JSON.stringify(payload));
        }
    }
};
exports.StreamWS = StreamWS;
exports.StreamWS = StreamWS = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Optional)()),
    __param(0, (0, common_1.Inject)('CONFIG_OPTIONS')),
    __metadata("design:paramtypes", [Object])
], StreamWS);
//# sourceMappingURL=ws_stream.js.map