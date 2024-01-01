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
exports.Market = void 0;
const v3_1 = require("./v3");
const RequestMethod_1 = require("../../../enums/RequestMethod");
const validation_1 = require("../../../helpers/validation");
const common_1 = require("@nestjs/common");
let Market = class Market extends v3_1.V3 {
    constructor(options) {
        super(options);
    }
    ping() {
        return this.publicRequest(RequestMethod_1.RequestMethod.GET, '/ping');
    }
    time() {
        return this.publicRequest(RequestMethod_1.RequestMethod.GET, '/time');
    }
    exchangeInfo(options = {}) {
        if (Object.prototype.hasOwnProperty.call(options, 'symbol')) {
            options.symbol = options.symbol.toUpperCase();
        }
        if (Object.prototype.hasOwnProperty.call(options, 'symbols')) {
            options.symbols = options.symbols.map((symbol) => symbol.toUpperCase());
        }
        return this.publicRequest(RequestMethod_1.RequestMethod.GET, '/exchangeInfo', options);
    }
    depth(symbol, options = {}) {
        (0, validation_1.validateRequiredParameters)({ symbol });
        return this.publicRequest(RequestMethod_1.RequestMethod.GET, '/depth', Object.assign(options, {
            symbol: symbol.toUpperCase(),
        }));
    }
    trades(symbol, options = {}) {
        (0, validation_1.validateRequiredParameters)({ symbol });
        return this.publicRequest(RequestMethod_1.RequestMethod.GET, '/trades', Object.assign(options, {
            symbol: symbol.toUpperCase(),
        }));
    }
    historicalTrades(symbol, options = {}) {
        (0, validation_1.validateRequiredParameters)({ symbol });
        return this.publicRequest(RequestMethod_1.RequestMethod.GET, '/historicalTrades', Object.assign(options, {
            symbol: symbol.toUpperCase(),
        }));
    }
    aggTrades(symbol, options = {}) {
        (0, validation_1.validateRequiredParameters)({ symbol });
        return this.publicRequest(RequestMethod_1.RequestMethod.GET, '/aggTrades', Object.assign(options, {
            symbol: symbol.toUpperCase(),
        }));
    }
    klines(symbol, interval, options = {}) {
        (0, validation_1.validateRequiredParameters)({ symbol, interval });
        return this.publicRequest(RequestMethod_1.RequestMethod.GET, '/klines', Object.assign(options, {
            symbol: symbol.toUpperCase(),
            interval,
        }));
    }
    uiklines(symbol, interval, options = {}) {
        (0, validation_1.validateRequiredParameters)({ symbol, interval });
        return this.publicRequest(RequestMethod_1.RequestMethod.GET, '/uiKlines', Object.assign(options, {
            symbol: symbol.toUpperCase(),
            interval,
        }));
    }
    avgPrice(symbol) {
        (0, validation_1.validateRequiredParameters)({ symbol });
        return this.publicRequest(RequestMethod_1.RequestMethod.GET, '/avgPrice', {
            symbol: symbol.toUpperCase(),
        });
    }
    ticker24hr(symbol = '', symbols = [], type = 'FULL') {
        symbols = symbols.map((symbol) => symbol.toUpperCase());
        return this.publicRequest(RequestMethod_1.RequestMethod.GET, '/ticker/24hr', {
            symbol: symbol.toUpperCase(),
            symbols,
            type,
        });
    }
    tickerPrice(symbol = '', symbols = []) {
        symbols = symbols.map((symbol) => symbol.toUpperCase());
        return this.publicRequest(RequestMethod_1.RequestMethod.GET, '/ticker/price', {
            symbol: symbol.toUpperCase(),
            symbols,
        });
    }
    bookTicker(symbol = '', symbols = []) {
        symbols = symbols.map((symbol) => symbol.toUpperCase());
        return this.publicRequest(RequestMethod_1.RequestMethod.GET, '/ticker/bookTicker', {
            symbol: symbol.toUpperCase(),
            symbols,
        });
    }
    rollingWindowTicker(symbol = '', symbols = [], options = {}) {
        symbols = symbols.map((symbol) => symbol.toUpperCase());
        return this.publicRequest(RequestMethod_1.RequestMethod.GET, '/ticker', Object.assign(options, {
            symbol: symbol.toUpperCase(),
            symbols,
        }));
    }
};
exports.Market = Market;
exports.Market = Market = __decorate([
    __param(0, (0, common_1.Optional)()),
    __param(0, (0, common_1.Inject)('CONFIG_OPTIONS')),
    __metadata("design:paramtypes", [Object])
], Market);
//# sourceMappingURL=market.js.map