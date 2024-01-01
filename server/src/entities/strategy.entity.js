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
exports.Strategy = void 0;
const typeorm_1 = require("typeorm");
const Interval_1 = require("../binance-api/enums/Interval");
const baseStrategy_enum_1 = require("../enums/baseStrategy.enum");
const subscription_entity_1 = require("./subscription.entity");
const strategyParam_entity_1 = require("./strategyParam.entity");
let Strategy = class Strategy {
    constructor() {
        this.trade = {
            isBuy: false,
            stopLoss: 0,
            takeProfit: 0,
        };
    }
    getStreamName() {
        return this.symbol.toLowerCase() + '@kline_' + this.interval;
    }
};
exports.Strategy = Strategy;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Strategy.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: baseStrategy_enum_1.BaseStrategyEnum, name: 'base_strategy' }),
    __metadata("design:type", String)
], Strategy.prototype, "baseStrategy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Strategy.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Strategy.prototype, "symbol", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Interval_1.Interval }),
    __metadata("design:type", String)
], Strategy.prototype, "interval", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Strategy.prototype, "min_deposit", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => strategyParam_entity_1.StrategyParam, (param) => param.strategy, { eager: true }),
    __metadata("design:type", Array)
], Strategy.prototype, "params", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Strategy.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => subscription_entity_1.Subscription, (subscription) => subscription.strategy),
    __metadata("design:type", Array)
], Strategy.prototype, "subscriptions", void 0);
exports.Strategy = Strategy = __decorate([
    (0, typeorm_1.Entity)({ name: 'strategies' })
], Strategy);
//# sourceMappingURL=strategy.entity.js.map