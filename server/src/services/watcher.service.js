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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatcherService = void 0;
const common_1 = require("@nestjs/common");
const ws_stream_1 = require("../binance-api/services/ws/stream/ws_stream");
const kline_ws_dto_1 = require("../binance-api/dto/kline_ws.dto");
const market_1 = require("../binance-api/services/api/v3/market");
const kline_dto_1 = require("../binance-api/dto/kline.dto");
const event_emitter_1 = require("@nestjs/event-emitter");
let WatcherService = class WatcherService {
    constructor(binanceStreamService, binanceMarketService, eventEmitter) {
        this.binanceStreamService = binanceStreamService;
        this.binanceMarketService = binanceMarketService;
        this.eventEmitter = eventEmitter;
        this.subscriptions = [];
        this.MAX_KLINES_LENGTH = 500;
        this.klines = {};
        binanceStreamService.onMessage$.subscribe((data) => {
            if (data?.result || data?.result === null) {
                console.log(data.result);
            }
            else {
                const kline = new kline_ws_dto_1.KlineWsDto(data);
                const klineName = kline.symbol + '_' + kline.interval;
                if (kline.closeTime - kline.lastTime < 10) {
                    if (!this.klines.hasOwnProperty(klineName)) {
                        this.klines[klineName] = new Map();
                        this.binanceMarketService.klines(kline.symbol, kline.interval).then((res) => {
                            res.data.forEach((el) => {
                                const kl = new kline_dto_1.KlineDto(el);
                                this.klines[klineName].set(kl.openTime, kl);
                            });
                        });
                    }
                    else if (this.klines[klineName].size > 0) {
                        this.klines[klineName].set(kline.openTime, kline);
                        eventEmitter.emit('kline.change', kline.symbol, kline.interval, this.klines[klineName]);
                    }
                    if (this.klines[klineName].size > this.MAX_KLINES_LENGTH) {
                        const [firstKey] = this.klines[klineName].keys();
                        this.klines[klineName].delete(firstKey);
                    }
                }
                eventEmitter.emit('kline.stream', kline.symbol, kline.interval, this.klines[klineName], kline);
            }
        });
    }
    subscribe(stream) {
        if (this.subscriptions.indexOf(stream) === -1) {
            this.subscriptions.push(stream);
            this.binanceStreamService.subscribe(stream);
        }
    }
    unsubscribe(stream) {
        const index = this.subscriptions.indexOf(stream);
        if (index !== -1) {
            this.subscriptions.splice(index, 1);
            this.binanceStreamService.unsubscribe(stream);
        }
    }
};
exports.WatcherService = WatcherService;
exports.WatcherService = WatcherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ws_stream_1.StreamWS,
        market_1.Market,
        event_emitter_1.EventEmitter2])
], WatcherService);
//# sourceMappingURL=watcher.service.js.map