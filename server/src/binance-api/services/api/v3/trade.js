"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trade = void 0;
const v3_1 = require("./v3");
const RequestMethod_1 = require("../../../enums/RequestMethod");
const validation_1 = require("../../../helpers/validation");
class Trade extends v3_1.V3 {
    newOrderTest(symbol, side, type, options = {}) {
        (0, validation_1.validateRequiredParameters)({ symbol, side, type });
        return this.signRequest(RequestMethod_1.RequestMethod.POST, '/order/test', Object.assign(options, {
            symbol: symbol.toUpperCase(),
            side: side.toUpperCase(),
            type: type.toUpperCase(),
        }));
    }
    newOrder(symbol, side, type, options = {}) {
        (0, validation_1.validateRequiredParameters)({ symbol, side, type });
        return this.signRequest(RequestMethod_1.RequestMethod.POST, '/order', Object.assign(options, {
            symbol: symbol.toUpperCase(),
            side: side.toUpperCase(),
            type: type.toUpperCase(),
        }));
    }
    cancelOrder(symbol, options = {}) {
        (0, validation_1.validateRequiredParameters)({ symbol });
        return this.signRequest(RequestMethod_1.RequestMethod.DELETE, '/order', Object.assign(options, {
            symbol: symbol.toUpperCase(),
        }));
    }
    cancelOpenOrders(symbol, options = {}) {
        (0, validation_1.validateRequiredParameters)({ symbol });
        return this.signRequest(RequestMethod_1.RequestMethod.DELETE, '/openOrders', Object.assign(options, {
            symbol: symbol.toUpperCase(),
        }));
    }
    getOrder(symbol, options = {}) {
        (0, validation_1.validateRequiredParameters)({ symbol });
        return this.signRequest(RequestMethod_1.RequestMethod.GET, '/order', Object.assign(options, {
            symbol: symbol.toUpperCase(),
        }));
    }
    cancelAndReplace(symbol, side, type, cancelReplaceMode, options = {}) {
        (0, validation_1.validateRequiredParameters)({ symbol, side, type, cancelReplaceMode });
        return this.signRequest(RequestMethod_1.RequestMethod.POST, '/order/cancelReplace', Object.assign(options, {
            symbol: symbol.toUpperCase(),
            side: side.toUpperCase(),
            type: type.toUpperCase(),
            cancelReplaceMode,
        }));
    }
    openOrders(options = {}) {
        return this.signRequest(RequestMethod_1.RequestMethod.GET, '/openOrders', options);
    }
    allOrders(symbol, options = {}) {
        (0, validation_1.validateRequiredParameters)({ symbol });
        return this.signRequest(RequestMethod_1.RequestMethod.GET, '/allOrders', Object.assign(options, {
            symbol: symbol.toUpperCase(),
        }));
    }
    newOCOOrder(symbol, side, quantity, price, stopPrice, options = {}) {
        (0, validation_1.validateRequiredParameters)({ symbol, side, quantity, price, stopPrice });
        return this.signRequest(RequestMethod_1.RequestMethod.POST, '/order/oco', Object.assign(options, {
            symbol: symbol.toUpperCase(),
            side: side.toUpperCase(),
            quantity,
            price,
            stopPrice,
        }));
    }
    cancelOCOOrder(symbol, options = {}) {
        (0, validation_1.validateRequiredParameters)({ symbol });
        return this.signRequest(RequestMethod_1.RequestMethod.DELETE, '/orderList', Object.assign(options, {
            symbol: symbol.toUpperCase(),
        }));
    }
    getOCOOrder(options = {}) {
        return this.signRequest(RequestMethod_1.RequestMethod.GET, '/orderList', options);
    }
    getOCOOrders(options = {}) {
        return this.signRequest(RequestMethod_1.RequestMethod.GET, '/allOrderList', options);
    }
    getOpenOCOOrders(options = {}) {
        return this.signRequest(RequestMethod_1.RequestMethod.GET, '/openOrderList', options);
    }
    account(options = {}) {
        return this.signRequest(RequestMethod_1.RequestMethod.GET, '/account', options);
    }
    myTrades(symbol, options = {}) {
        (0, validation_1.validateRequiredParameters)({ symbol });
        return this.signRequest(RequestMethod_1.RequestMethod.GET, '/myTrades', Object.assign(options, {
            symbol: symbol.toUpperCase(),
        }));
    }
    orderCount(options = {}) {
        return this.signRequest(RequestMethod_1.RequestMethod.GET, '/rateLimit/order', options);
    }
}
exports.Trade = Trade;
//# sourceMappingURL=trade.js.map