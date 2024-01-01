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
exports.StrategyParam = void 0;
const typeorm_1 = require("typeorm");
const param_entity_1 = require("./param.entity");
const strategy_entity_1 = require("./strategy.entity");
let StrategyParam = class StrategyParam {
};
exports.StrategyParam = StrategyParam;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StrategyParam.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => strategy_entity_1.Strategy, (strategy) => strategy.params),
    __metadata("design:type", strategy_entity_1.Strategy)
], StrategyParam.prototype, "strategy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => param_entity_1.Param, { eager: true }),
    __metadata("design:type", param_entity_1.Param)
], StrategyParam.prototype, "param", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], StrategyParam.prototype, "value", void 0);
exports.StrategyParam = StrategyParam = __decorate([
    (0, typeorm_1.Entity)({ name: 'strategy_params' }),
    (0, typeorm_1.Index)(['strategy', 'param'], { unique: true })
], StrategyParam);
//# sourceMappingURL=strategyParam.entity.js.map