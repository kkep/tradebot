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
exports.ApoloStrategyService = void 0;
const common_1 = require("@nestjs/common");
const strategy_service_1 = require("./strategy.service");
const baseStrategy_enum_1 = require("../../enums/baseStrategy.enum");
const RSI_1 = require("../../indicators/RSI");
const MA_1 = require("../../indicators/MA");
const kline_ws_dto_1 = require("../../binance-api/dto/kline_ws.dto");
const Interval_1 = require("../../binance-api/enums/Interval");
const event_emitter_1 = require("@nestjs/event-emitter");
let ApoloStrategyService = class ApoloStrategyService extends strategy_service_1.StrategyService {
    constructor() {
        super(...arguments);
        this.name = baseStrategy_enum_1.BaseStrategyEnum.APOLO;
        this.requiredParams = [
            { name: 'RSI_PERIOD', title: 'Период RSI' },
            { name: 'RSI', title: 'Значение RSI' },
            { name: 'MA_FAST_PERIOD', title: 'Период MA (быстрый)' },
            { name: 'MA_SLOW_PERIOD', title: 'Период MA (медленный)' },
        ];
        this.clientRequiredParams = [
            { name: 'TAKE_PROFIT_PERCENT', title: 'Take Profit (%)' },
            { name: 'STOP_LOSS_PERCENT', title: 'Stop Loss (%)' },
            { name: 'MARTINGALE', title: 'Коэфф. мартингейла' },
            { name: 'FIRST_ORDER', title: '% от депо. на 1 покупку' },
            { name: 'GRID_ORDER_DISTANCE', title: 'Шаг между ордерами (%)' },
            { name: 'GRID_MAX_ORDERS', title: 'Макс. число докупок' },
        ];
    }
    trade(symbol, interval, klines) {
        const kls = Array.from(klines, ([, kline]) => kline);
        const kline = kls[kls.length - 1];
        const TAKE_PROFIT_PERCENT = 2;
        const STOP_LOSS_PERCENT = 2;
        this.variations.forEach((strategy) => {
            console.log('strategy');
            if (strategy.isActive && strategy.symbol === symbol && strategy.interval === interval) {
                const params = this.getParams(strategy.params);
                if (strategy.trade.isBuy) {
                    if (strategy.trade.takeProfit && kline.high >= strategy.trade.takeProfit) {
                        strategy.trade.isBuy = false;
                        strategy.trade.stopLoss = 0;
                        strategy.trade.takeProfit = 0;
                        console.log('sell. take profit');
                    }
                    if (strategy.trade.stopLoss && kline.low <= strategy.trade.stopLoss) {
                        strategy.trade.isBuy = false;
                        strategy.trade.stopLoss = 0;
                        strategy.trade.takeProfit = 0;
                        console.log('sell. stop loss');
                    }
                    console.log('isBuy');
                }
                else {
                    const rsi = new RSI_1.RSI(params.RSI_PERIOD, kls).calculate();
                    const maFast = new MA_1.MA(params.MA_FAST_PERIOD, kls).calculate();
                    const maSlow = new MA_1.MA(params.MA_SLOW_PERIOD, kls).calculate();
                    if (kline.high > maFast && kline.high > maSlow && rsi > params.RSI) {
                        console.log(new Date(kline.openTime), 'BUY');
                        strategy.trade.takeProfit = kline.high + (kline.high / 100) * TAKE_PROFIT_PERCENT;
                        strategy.trade.stopLoss = kline.high - (kline.high / 100) * STOP_LOSS_PERCENT;
                        strategy.subscriptions.forEach((subscription) => {
                            if (!subscription.orders?.length) {
                                this.getNewTradeService(subscription).firstBuy(strategy.symbol, kline.close);
                            }
                        });
                    }
                    else if (kline.high < maFast || kline.high < maSlow) {
                        strategy.subscriptions.forEach((subscription) => {
                            if (subscription.orders?.length) {
                                this.getNewTradeService(subscription).gridBuy(strategy.symbol, kline.close);
                            }
                        });
                    }
                    else {
                    }
                }
            }
        });
    }
    checkOrder(symbol, interval, klines, kline) {
        for (const [id, strategy] of this.variations) {
            if (symbol !== strategy.symbol) {
                continue;
            }
            for (const subscription of strategy.subscriptions) {
                if (subscription.orders?.length) {
                    this.getNewTradeService(subscription).checkOrders(symbol, kline.close);
                }
            }
        }
    }
};
exports.ApoloStrategyService = ApoloStrategyService;
__decorate([
    (0, event_emitter_1.OnEvent)('kline.change'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Map]),
    __metadata("design:returntype", void 0)
], ApoloStrategyService.prototype, "trade", null);
__decorate([
    (0, event_emitter_1.OnEvent)('kline.stream'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Map, kline_ws_dto_1.KlineWsDto]),
    __metadata("design:returntype", void 0)
], ApoloStrategyService.prototype, "checkOrder", null);
exports.ApoloStrategyService = ApoloStrategyService = __decorate([
    (0, common_1.Injectable)()
], ApoloStrategyService);
//# sourceMappingURL=apolo.strategy.service.js.map