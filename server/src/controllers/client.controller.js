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
exports.ClientController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("../app.service");
let ClientController = class ClientController {
    constructor(appService) {
        this.appService = appService;
    }
    async createClient(clientData, res) {
        const client = await this.appService.createClient(clientData.apiKey, clientData.apiSecret);
        res.status(common_1.HttpStatus.OK).json({ id: client.id });
    }
    async subscribeToStrategy(subscription, clientId, res) {
        const re = await this.appService.subscribeToStrategy(clientId, subscription);
        res.status(common_1.HttpStatus.OK).json(re);
    }
};
exports.ClientController = ClientController;
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "createClient", null);
__decorate([
    (0, common_1.Post)('/subscribe'),
    __param(0, (0, common_1.Body)('subscription')),
    __param(1, (0, common_1.Body)('clientId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "subscribeToStrategy", null);
exports.ClientController = ClientController = __decorate([
    (0, common_1.Controller)({ path: '/client' }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], ClientController);
//# sourceMappingURL=client.controller.js.map