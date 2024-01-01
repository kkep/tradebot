"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var BinanceApiModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinanceApiModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const blvt_1 = require("./services/sapi/v1/blvt");
const ws_stream_1 = require("./services/ws/stream/ws_stream");
const market_1 = require("./services/api/v3/market");
let BinanceApiModule = BinanceApiModule_1 = class BinanceApiModule {
    static forRoot(options) {
        return {
            module: BinanceApiModule_1,
            imports: [axios_1.HttpModule],
            providers: [
                {
                    provide: 'CONFIG_OPTIONS',
                    useValue: options,
                },
                blvt_1.Blvt,
                ws_stream_1.StreamWS,
                market_1.Market,
            ],
            exports: [blvt_1.Blvt, ws_stream_1.StreamWS, market_1.Market],
        };
    }
};
exports.BinanceApiModule = BinanceApiModule;
exports.BinanceApiModule = BinanceApiModule = BinanceApiModule_1 = __decorate([
    (0, common_1.Module)({})
], BinanceApiModule);
//# sourceMappingURL=binance-api.module.js.map