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
exports.ClientParam = void 0;
const typeorm_1 = require("typeorm");
const param_entity_1 = require("./param.entity");
const client_entity_1 = require("./client.entity");
const strategy_entity_1 = require("./strategy.entity");
const subscription_entity_1 = require("./subscription.entity");
let ClientParam = class ClientParam {
};
exports.ClientParam = ClientParam;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ClientParam.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client, (client) => client.params, { onDelete: 'CASCADE' }),
    __metadata("design:type", client_entity_1.Client)
], ClientParam.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => strategy_entity_1.Strategy, { onDelete: 'CASCADE' }),
    __metadata("design:type", strategy_entity_1.Strategy)
], ClientParam.prototype, "strategy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => param_entity_1.Param, { onDelete: 'CASCADE' }),
    __metadata("design:type", param_entity_1.Param)
], ClientParam.prototype, "param", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subscription_entity_1.Subscription, { onDelete: 'CASCADE' }),
    __metadata("design:type", subscription_entity_1.Subscription)
], ClientParam.prototype, "subscription", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ClientParam.prototype, "value", void 0);
exports.ClientParam = ClientParam = __decorate([
    (0, typeorm_1.Entity)({ name: 'client_params' }),
    (0, typeorm_1.Index)(['client', 'param'], { unique: true })
], ClientParam);
//# sourceMappingURL=clientParam.entity.js.map