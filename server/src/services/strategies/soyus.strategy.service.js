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
exports.SoyusStrategyService = void 0;
const strategy_service_1 = require("./strategy.service");
const common_1 = require("@nestjs/common");
const baseStrategy_enum_1 = require("../../enums/baseStrategy.enum");
const Interval_1 = require("../../binance-api/enums/Interval");
const event_emitter_1 = require("@nestjs/event-emitter");
let SoyusStrategyService = class SoyusStrategyService extends strategy_service_1.StrategyService {
    constructor() {
        super(...arguments);
        this.name = baseStrategy_enum_1.BaseStrategyEnum.SOYUS;
        this.requiredParams = [];
        this.clientRequiredParams = [];
    }
    trade(symbol, interval, klines) { }
};
exports.SoyusStrategyService = SoyusStrategyService;
__decorate([
    (0, event_emitter_1.OnEvent)('kline.change'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Map]),
    __metadata("design:returntype", void 0)
], SoyusStrategyService.prototype, "trade", null);
exports.SoyusStrategyService = SoyusStrategyService = __decorate([
    (0, common_1.Injectable)()
], SoyusStrategyService);
//# sourceMappingURL=soyus.strategy.service.js.map