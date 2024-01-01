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
exports.Blvt = void 0;
const v1_1 = require("./v1");
const RequestMethod_1 = require("../../../enums/RequestMethod");
const validation_1 = require("../../../helpers/validation");
const common_1 = require("@nestjs/common");
let Blvt = class Blvt extends v1_1.V1 {
    constructor(options) {
        super(options);
        this.url += '/blvt';
    }
    blvtInfo(options = {}) {
        return this.publicRequest(RequestMethod_1.RequestMethod.GET, '/tokenInfo', options);
    }
    subscribeBlvt(tokenName, cost, options = {}) {
        (0, validation_1.validateRequiredParameters)({ tokenName, cost });
        return this.signRequest(RequestMethod_1.RequestMethod.POST, '/subscribe', Object.assign(options, {
            tokenName,
            cost,
        }));
    }
    blvtSubscriptionRecord(options = {}) {
        return this.signRequest(RequestMethod_1.RequestMethod.GET, '/subscribe/record', options);
    }
    redeemBlvt(tokenName, amount, options = {}) {
        (0, validation_1.validateRequiredParameters)({ tokenName, amount });
        return this.signRequest(RequestMethod_1.RequestMethod.POST, '/redeem', Object.assign(options, {
            tokenName,
            amount,
        }));
    }
    blvtRedemptionRecord(options = {}) {
        return this.signRequest(RequestMethod_1.RequestMethod.GET, '/redeem/record', options);
    }
};
exports.Blvt = Blvt;
exports.Blvt = Blvt = __decorate([
    __param(0, (0, common_1.Optional)()),
    __param(0, (0, common_1.Inject)('CONFIG_OPTIONS')),
    __metadata("design:paramtypes", [Object])
], Blvt);
//# sourceMappingURL=blvt.js.map