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
exports.Subscription = void 0;
const typeorm_1 = require("typeorm");
const client_entity_1 = require("./client.entity");
const strategy_entity_1 = require("./strategy.entity");
const clientParam_entity_1 = require("./clientParam.entity");
const order_entity_1 = require("./order.entity");
let Subscription = class Subscription {
    constructor() {
        this.isActive = true;
    }
};
exports.Subscription = Subscription;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Subscription.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client, (client) => client.subscriptions),
    __metadata("design:type", client_entity_1.Client)
], Subscription.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => strategy_entity_1.Strategy, (strategy) => strategy.subscriptions),
    __metadata("design:type", strategy_entity_1.Strategy)
], Subscription.prototype, "strategy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => clientParam_entity_1.ClientParam, (params) => params.subscription),
    __metadata("design:type", Array)
], Subscription.prototype, "params", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.Order, (order) => order.subscription),
    __metadata("design:type", Array)
], Subscription.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'take_profit', nullable: true }),
    __metadata("design:type", Number)
], Subscription.prototype, "takeProfit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], Subscription.prototype, "isActive", void 0);
exports.Subscription = Subscription = __decorate([
    (0, typeorm_1.Entity)({ name: 'subscriptions' }),
    (0, typeorm_1.Index)(['client', 'strategy'], { unique: true })
], Subscription);
//# sourceMappingURL=subscription.entity.js.map