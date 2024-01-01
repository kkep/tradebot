"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const configuration_1 = require("../config/configuration");
const typeorm_1 = require("@nestjs/typeorm");
const database_1 = require("../config/database");
const binance_api_module_1 = require("./binance-api/binance-api.module");
const binance_1 = require("../config/binance");
const strategy_entity_1 = require("./entities/strategy.entity");
const strategy_subscriber_1 = require("./subscribers/strategy.subscriber");
const apolo_strategy_service_1 = require("./services/strategies/apolo.strategy.service");
const soyus_strategy_service_1 = require("./services/strategies/soyus.strategy.service");
const watcher_service_1 = require("./services/watcher.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const subscription_entity_1 = require("./entities/subscription.entity");
const client_entity_1 = require("./entities/client.entity");
const strategyParam_entity_1 = require("./entities/strategyParam.entity");
const clientParam_entity_1 = require("./entities/clientParam.entity");
const param_entity_1 = require("./entities/param.entity");
const cache_manager_1 = require("@nestjs/cache-manager");
const subscription_subscriber_1 = require("./subscribers/subscription.subscriber");
const order_entity_1 = require("./entities/order.entity");
const client_controller_1 = require("./controllers/client.controller");
const strategy_controller_1 = require("./controllers/strategy.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cache_manager_1.CacheModule.register(),
            config_1.ConfigModule.forRoot({
                envFilePath: ['.env'],
                isGlobal: true,
                load: [configuration_1.default, database_1.default],
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: (0, database_1.default)().database.type,
                host: (0, database_1.default)().database.host,
                port: (0, database_1.default)().database.port,
                username: (0, database_1.default)().database.user,
                password: (0, database_1.default)().database.password,
                database: (0, database_1.default)().database.database,
                entities: [strategy_entity_1.Strategy, client_entity_1.Client, subscription_entity_1.Subscription, param_entity_1.Param, strategyParam_entity_1.StrategyParam, clientParam_entity_1.ClientParam, order_entity_1.Order],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([
                strategy_entity_1.Strategy,
                param_entity_1.Param,
                strategyParam_entity_1.StrategyParam,
                client_entity_1.Client,
                subscription_entity_1.Subscription,
                order_entity_1.Order,
                clientParam_entity_1.ClientParam
            ]),
            binance_api_module_1.BinanceApiModule.forRoot({
                apiKey: (0, binance_1.default)().binance.apiKey,
                apiSecret: (0, binance_1.default)().binance.apiSecret,
            }),
            event_emitter_1.EventEmitterModule.forRoot(),
        ],
        controllers: [app_controller_1.AppController, client_controller_1.ClientController, strategy_controller_1.StrategyController],
        providers: [app_service_1.AppService, watcher_service_1.WatcherService, strategy_subscriber_1.StrategySubscriber, subscription_subscriber_1.SubscriptionSubscriber, apolo_strategy_service_1.ApoloStrategyService, soyus_strategy_service_1.SoyusStrategyService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map