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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const strategy_entity_1 = require("./entities/strategy.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const watcher_service_1 = require("./services/watcher.service");
const param_entity_1 = require("./entities/param.entity");
const strategyParam_entity_1 = require("./entities/strategyParam.entity");
const client_entity_1 = require("./entities/client.entity");
const subscription_entity_1 = require("./entities/subscription.entity");
const cache_manager_1 = require("@nestjs/cache-manager");
const trade_1 = require("./binance-api/services/api/v3/trade");
const clientParam_entity_1 = require("./entities/clientParam.entity");
let AppService = class AppService {
    constructor(strategyRepository, strategyParamsRepository, clientParamsRepository, paramRepository, clientRepository, subscriptionRepository, watcherService, cacheManager) {
        this.strategyRepository = strategyRepository;
        this.strategyParamsRepository = strategyParamsRepository;
        this.clientParamsRepository = clientParamsRepository;
        this.paramRepository = paramRepository;
        this.clientRepository = clientRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.watcherService = watcherService;
        this.cacheManager = cacheManager;
        this.strategyRepository
            .find({
            relations: [
                "subscriptions.client",
                "subscriptions.params.param",
                "subscriptions.orders",
                "params.param"
            ]
        })
            .then((value) => {
        });
    }
    getHello() {
        const s = new trade_1.Trade({
            apiKey: '6KlLBzvt1CbnXTGvx2dhdpTIpcgXMub7bLN7qThfUjixw8aTfPdjCfAIJSgt1S1D',
            apiSecret: 'ms8vYHZuni9s4Rs8lv8BEhECX14j2rPyEiIg3vD4XZF6qkz14kF0nFqYyQ9bbnH5',
        });
        const options = {
            recvWindow: 5000,
            quantity: 6,
            newOrderRespType: "RESULT"
        };
        return "Hello World!";
    }
    getBaseStrategyStrategyParams(baseStrategy) {
        return this.paramRepository.findBy({
            baseStrategy: baseStrategy,
            forClient: false,
        });
    }
    getBaseStrategyClientParams(baseStrategy) {
        return this.paramRepository.findBy({
            baseStrategy: baseStrategy,
            forClient: true,
        });
    }
    async createStrategy(strategy) {
        console.log(strategy);
        const newStrategy = this.strategyRepository.create();
        newStrategy.baseStrategy = strategy.baseStrategy;
        newStrategy.symbol = strategy.symbol;
        newStrategy.interval = strategy.interval;
        newStrategy.min_deposit = 0;
        newStrategy.title = strategy.title;
        await this.strategyRepository.save(newStrategy);
        for (const key of Object.keys(strategy.params)) {
            const param = this.strategyParamsRepository.create();
            param.strategy = newStrategy;
            param.value = strategy.params[key];
            param.param = await this.paramRepository.findOneBy({ id: Number(key) });
            await this.strategyParamsRepository.save(param);
        }
    }
    async createClient(apiKey, apiSecret) {
        let client = await this.clientRepository.findOneBy({ apiKey, apiSecret });
        if (client) {
            return client;
        }
        else {
            client = this.clientRepository.create();
            client.apiKey = apiKey;
            client.apiSecret = apiSecret;
            return this.clientRepository.save(client);
        }
    }
    getStrategies() {
        return this.strategyRepository.find({
            relations: ['params.param', 'subscriptions.params.param'],
            where: {
                subscriptions: {
                    client: {
                        id: 1,
                    },
                },
            },
        });
    }
    async subscribeToStrategy(clientId, newSubscription) {
        const client = await this.clientRepository.findOneBy({ id: clientId });
        const strategy = await this.strategyRepository.findOneBy({ id: newSubscription.strategyId });
        let subscription = await this.subscriptionRepository.findOne({
            relations: ['params.param'],
            where: {
                client: {
                    id: clientId,
                },
                strategy: {
                    id: newSubscription.strategyId,
                },
            },
        });
        if (subscription) {
            subscription.isActive = true;
            await this.subscriptionRepository.save(subscription);
            for (const p of subscription.params) {
                p.value = newSubscription.params[p.param.id.toString()];
                await this.clientParamsRepository.save(p);
            }
        }
        else {
            subscription = this.subscriptionRepository.create();
            subscription.strategy = strategy;
            subscription.client = client;
            await this.subscriptionRepository.save(subscription);
            for (const val of newSubscription.params) {
                const key = newSubscription.params.indexOf(val);
                const param = await this.paramRepository.findOneBy({ id: Number(key) });
                this.clientParamsRepository.create({
                    client: client,
                    strategy: strategy,
                    value: val,
                    subscription: subscription,
                    param: param,
                });
            }
        }
        return subscription;
    }
    stopStrategy(strategyId) {
        return this.setStrategyState(strategyId, false);
    }
    startStrategy(strategyId) {
        return this.setStrategyState(strategyId, true);
    }
    async setStrategyState(strategyId, state) {
        const strategy = await this.strategyRepository.findOne({
            relations: ['subscriptions.client', 'subscriptions.params.param', 'subscriptions.orders', 'params.param'],
            where: {
                id: strategyId,
            },
        });
        strategy.isActive = state;
        await this.strategyRepository.save(strategy);
        return true;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(strategy_entity_1.Strategy)),
    __param(1, (0, typeorm_2.InjectRepository)(strategyParam_entity_1.StrategyParam)),
    __param(2, (0, typeorm_2.InjectRepository)(clientParam_entity_1.ClientParam)),
    __param(3, (0, typeorm_2.InjectRepository)(param_entity_1.Param)),
    __param(4, (0, typeorm_2.InjectRepository)(client_entity_1.Client)),
    __param(5, (0, typeorm_2.InjectRepository)(subscription_entity_1.Subscription)),
    __param(7, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        watcher_service_1.WatcherService, Object])
], AppService);
//# sourceMappingURL=app.service.js.map