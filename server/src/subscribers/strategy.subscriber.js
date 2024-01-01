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
exports.StrategySubscriber = void 0;
const strategy_entity_1 = require("../entities/strategy.entity");
const typeorm_1 = require("typeorm");
const rxjs_1 = require("rxjs");
let StrategySubscriber = class StrategySubscriber {
    constructor(dataSource) {
        this.afterLoad$ = new rxjs_1.Subject();
        this.afterUpdate$ = new rxjs_1.Subject();
        this.afterInsert$ = new rxjs_1.Subject();
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return strategy_entity_1.Strategy;
    }
    afterLoad(entity) {
        console.log('AFTER LOAD');
        this.afterLoad$.next(entity);
    }
    afterUpdate(event) {
        this.afterUpdate$.next(event.databaseEntity);
    }
    afterInsert(event) {
        this.afterInsert$.next(event.entity);
    }
};
exports.StrategySubscriber = StrategySubscriber;
exports.StrategySubscriber = StrategySubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], StrategySubscriber);
//# sourceMappingURL=strategy.subscriber.js.map