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
exports.StrategyService = void 0;
const strategy_subscriber_1 = require("../../subscribers/strategy.subscriber");
const strategy_entity_1 = require("../../entities/strategy.entity");
const typeorm_1 = require("typeorm");
const watcher_service_1 = require("../watcher.service");
const typeorm_2 = require("@nestjs/typeorm");
const param_entity_1 = require("../../entities/param.entity");
const subscription_subscriber_1 = require("../../subscribers/subscription.subscriber");
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const trade_service_1 = require("../trade.service");
const order_entity_1 = require("../../entities/order.entity");
let StrategyService = class StrategyService {
    constructor(subscriber, subscriptionSubscriber, watcherService, paramRepository, cacheManager, orderRepository, strategyRepository) {
        this.subscriber = subscriber;
        this.subscriptionSubscriber = subscriptionSubscriber;
        this.watcherService = watcherService;
        this.paramRepository = paramRepository;
        this.cacheManager = cacheManager;
        this.orderRepository = orderRepository;
        this.strategyRepository = strategyRepository;
        this.variations = new Map();
        this.subscriptions = new Map();
        subscriber.afterLoad$.subscribe((entity) => this.afterLoad(entity));
        subscriber.afterUpdate$.subscribe((entity) => this.afterUpdate(entity));
        subscriber.afterInsert$.subscribe((entity) => this.afterLoad(entity));
        subscriptionSubscriber.afterLoad$.subscribe((entity) => {
            this.afterLoadSubscription(entity);
        });
        subscriptionSubscriber.afterUpdate$.subscribe((entity) => this.afterUpdateSubscription(entity));
        subscriptionSubscriber.afterInsert$.subscribe((entity) => this.afterLoadSubscription(entity));
        this.init().then();
    }
    async init() {
        const params = await this.paramRepository.findBy({
            baseStrategy: this.name,
        });
        await this._checkParams(params, this.requiredParams, false);
        await this._checkParams(params, this.clientRequiredParams, true);
    }
    async _checkParams(exitsParams, params, forClient) {
        for (const param of params) {
            if (exitsParams.findIndex((p) => p.name === param.name && p.forClient === forClient) === -1) {
                const newParam = this.paramRepository.create({
                    name: param.name,
                    title: param.title,
                    baseStrategy: this.name,
                    forClient: forClient,
                });
                await this.paramRepository.save(newParam);
            }
        }
    }
    afterLoadSubscription(entity) {
    }
    afterUpdateSubscription(entity) { }
    afterLoad(entity) {
        if (entity.baseStrategy === this.name && entity.subscriptions?.length) {
            this.variations.set(entity.id, entity);
            if (entity.isActive) {
                this.watcherService.subscribe(entity.getStreamName());
            }
        }
    }
    getNewTradeService(subscription) {
        return new trade_service_1.TradeService(subscription, this.cacheManager, this.orderRepository, this.strategyRepository);
    }
    afterUpdate(strategy) {
        if (strategy.baseStrategy === this.name) {
            if (strategy.isActive) {
                const hasAnother = [...this.variations].filter(([key, value]) => {
                    return strategy.id !== key && strategy.symbol === value.symbol && strategy.interval === value.interval;
                }).length;
                if (!hasAnother) {
                    this.watcherService.unsubscribe(strategy.getStreamName());
                }
            }
            else {
                strategy.isActive = true;
                this.afterLoad(strategy);
            }
        }
    }
    getParams(params) {
        const obj = {};
        params.forEach((param) => {
            if (param.value == Number(param.value)) {
                obj[param.param.name] = Number(param.value);
            }
            else {
                obj[param.param.name] = param.value;
            }
        });
        return obj;
    }
};
exports.StrategyService = StrategyService;
exports.StrategyService = StrategyService = __decorate([
    __param(3, (0, typeorm_2.InjectRepository)(param_entity_1.Param)),
    __param(4, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(5, (0, typeorm_2.InjectRepository)(order_entity_1.Order)),
    __param(6, (0, typeorm_2.InjectRepository)(strategy_entity_1.Strategy)),
    __metadata("design:paramtypes", [strategy_subscriber_1.StrategySubscriber,
        subscription_subscriber_1.SubscriptionSubscriber,
        watcher_service_1.WatcherService,
        typeorm_1.Repository, Object, typeorm_1.Repository,
        typeorm_1.Repository])
], StrategyService);
//# sourceMappingURL=strategy.service.js.map