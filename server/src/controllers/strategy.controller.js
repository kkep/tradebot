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
exports.StrategyController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("../app.service");
const baseStrategy_enum_1 = require("../enums/baseStrategy.enum");
let StrategyController = class StrategyController {
    constructor(appService) {
        this.appService = appService;
    }
    getBaseStrategyParams(baseStrategy) {
        return this.appService.getBaseStrategyStrategyParams(baseStrategy);
    }
    getBaseStrategyClientParams(baseStrategy) {
        return this.appService.getBaseStrategyClientParams(baseStrategy);
    }
    async createStrategy(strategy, res) {
        await this.appService.createStrategy(strategy);
        res.status(common_1.HttpStatus.CREATED).json([]);
    }
    getStrategies() {
        return this.appService.getStrategies();
    }
    async stopStrategy(strategyId) {
        if (await this.appService.stopStrategy(strategyId)) {
            return { success: true };
        }
        else {
            return { success: false };
        }
    }
    async startStrategy(strategyId) {
        if (await this.appService.startStrategy(strategyId)) {
            return { success: true };
        }
        else {
            return { success: false };
        }
    }
};
exports.StrategyController = StrategyController;
__decorate([
    (0, common_1.Get)('/base/params/get/:baseStrategy'),
    __param(0, (0, common_1.Param)('baseStrategy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StrategyController.prototype, "getBaseStrategyParams", null);
__decorate([
    (0, common_1.Get)('/client/params/get/:baseStrategy'),
    __param(0, (0, common_1.Param)('baseStrategy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StrategyController.prototype, "getBaseStrategyClientParams", null);
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StrategyController.prototype, "createStrategy", null);
__decorate([
    (0, common_1.Get)('/get/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StrategyController.prototype, "getStrategies", null);
__decorate([
    (0, common_1.Post)('/stop/:strategyId'),
    __param(0, (0, common_1.Param)('strategyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StrategyController.prototype, "stopStrategy", null);
__decorate([
    (0, common_1.Post)('/start/:strategyId'),
    __param(0, (0, common_1.Param)('strategyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StrategyController.prototype, "startStrategy", null);
exports.StrategyController = StrategyController = __decorate([
    (0, common_1.Controller)({ path: '/strategy' }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], StrategyController);
//# sourceMappingURL=strategy.controller.js.map