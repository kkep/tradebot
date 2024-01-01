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
exports.TradeService = void 0;
const trade_1 = require("../binance-api/services/api/v3/trade");
const OrderSide_1 = require("../binance-api/enums/OrderSide");
const OrderType_1 = require("../binance-api/enums/OrderType");
const TimeInForce_1 = require("../binance-api/enums/TimeInForce");
const market_1 = require("../binance-api/services/api/v3/market");
const subscription_entity_1 = require("../entities/subscription.entity");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
let TradeService = class TradeService {
    constructor(subscription, cacheManager, orderRepository, strategyRepository) {
        this.subscription = subscription;
        this.cacheManager = cacheManager;
        this.orderRepository = orderRepository;
        this.strategyRepository = strategyRepository;
        this.params = {};
        this.client = subscription.client;
        subscription.params.forEach((param) => {
            this.params[param.param.name] = param.value;
        });
    }
    buy(symbol, price, quantity) {
        const options = this.getOptions(symbol, price, quantity);
        return this.getService().newOrder(symbol, OrderSide_1.OrderSide.BUY, OrderType_1.OrderType.MARKET, options);
    }
    async buyLimit(symbol, price, quantity) {
        if (quantity <= 0) {
            return;
        }
        console.log('BUY LIMIT', symbol, price, quantity);
        const options = this.getOptions(symbol, price, quantity);
        await this.getService().newOrder(symbol, OrderSide_1.OrderSide.BUY, OrderType_1.OrderType.LIMIT, options);
        console.log('BUY LIMIT COMPLETE', symbol, price, quantity);
    }
    async buyMarket(symbol, quantity) {
        if (quantity <= 0) {
            return;
        }
        console.log('BUY MARKET', symbol, quantity);
        const options = this.getOptions(symbol, null, quantity);
        delete options.timeInForce;
        await this.getService().newOrder(symbol, OrderSide_1.OrderSide.BUY, OrderType_1.OrderType.MARKET, options);
        console.log('BUY MARKET COMPLETE', symbol, quantity);
    }
    async sellLimit(symbol, price, quantity) {
        if (quantity <= 0) {
            return;
        }
        console.log('SELL LIMIT', symbol, price, quantity);
        const options = this.getOptions(symbol, price, quantity);
        await this.getService().newOrder(symbol, OrderSide_1.OrderSide.SELL, OrderType_1.OrderType.LIMIT, options);
        console.log('SELL LIMIT COMPLETE', symbol, price, quantity);
    }
    async firstBuy(symbol, price) {
        const { FIRST_ORDER } = this.params;
        const exchangeInfo = await this.getExchangeInfoBySymbol(symbol);
        const balance = (await this.getBalanceAsset(exchangeInfo.quoteAsset)).free * 1;
        const quantity = await this.fixQuantity(symbol, ((balance / 100) * FIRST_ORDER) / price);
        const takeProfit = await this.getTakeProfit(symbol, price);
        const order = this.orderRepository.create({
            price: price,
            quantity: quantity,
            isCompleted: true,
            subscription: this.subscription,
            takeProfit: takeProfit,
        });
        const quoteAssetQuantity = order.quantity * price;
        await this.buyMarket(symbol, quantity);
        await this.orderRepository.save(order);
        this.subscription.orders = [order];
        await this.sellLimit(symbol, takeProfit, await this.getBalanceBaseAssetQuantity(exchangeInfo));
    }
    async getTakeProfit(symbol, price) {
        const { TAKE_PROFIT_PERCENT } = this.params;
        const PRICE_FILTER = await this.filterExchangeInfo(symbol, 'PRICE_FILTER');
        const pricePrecision = this.getPrecision(PRICE_FILTER.tickSize);
        let takeProfit = price + (price / 100) * TAKE_PROFIT_PERCENT;
        takeProfit = takeProfit - (takeProfit % PRICE_FILTER.tickSize);
        return Number(takeProfit.toFixed(pricePrecision));
    }
    async getBalanceBaseAssetQuantity(exchangeInfo) {
        const LOT_SIZE = await this.filterExchangeInfo(exchangeInfo.symbol, 'LOT_SIZE');
        const lotPrecision = this.getPrecision(LOT_SIZE.stepSize);
        let balance = (await this.getBalanceAsset(exchangeInfo.baseAsset)).free * 1;
        balance = LOT_SIZE.stepSize * Math.floor(balance / LOT_SIZE.stepSize);
        return Number(balance.toFixed(lotPrecision));
    }
    getService() {
        if (!this.service) {
            this.service = new trade_1.Trade({ apiKey: this.client.apiKey, apiSecret: this.client.apiSecret });
        }
        return this.service;
    }
    getOptions(symbol, price, quantity) {
        const options = {
            recvWindow: 5000,
            timeInForce: TimeInForce_1.TimeInForce.GTC,
            quantity: quantity,
            newOrderRespType: 'RESULT',
        };
        if (price) {
            options['price'] = price;
        }
        return options;
    }
    getOrders(symbol) {
        const options = { symbol: symbol, recvWindow: 5000 };
        return this.getService().openOrders(options);
    }
    cancelOrder(symbol, orderId, origClientOrderId) {
        const options = {};
        if (orderId) {
            options['orderId'] = orderId;
        }
        else if (origClientOrderId) {
            options['origClientOrderId'] = origClientOrderId;
        }
        return this.getService().cancelOrder(symbol, options);
    }
    async checkOrders(symbol, price) {
        if (!this.subscription.orders?.length) {
            this.subscription.takeProfit = null;
            await this.orderRepository.remove(this.subscription.orders);
            this.subscription.orders = [];
            return;
        }
        console.log(this.subscription.orders?.length);
        let openedOrders = [];
        const takeProfit = this.subscription.takeProfit ?? this.subscription.orders[0]?.takeProfit;
        const exchangeInfo = await this.getExchangeInfoBySymbol(symbol);
        if (takeProfit && takeProfit < price) {
            console.log('Take profit/ CLose all orders');
            try {
                openedOrders = (await this.getOrders(symbol)).data;
            }
            catch (e) {
                console.log(e);
            }
            openedOrders.forEach((order) => {
                if (order.symbol === symbol && order.side === OrderSide_1.OrderSide.BUY) {
                    this.cancelOrder(symbol, order.orderId);
                }
            });
            await this.orderRepository.remove(this.subscription.orders);
            this.subscription.orders = [];
        }
        let newTp = false;
        for (const order of this.subscription.orders) {
            if (!order.isCompleted && order.price > price) {
                await this.buyLimit(symbol, order.price, order.quantity);
                order.isCompleted = true;
                newTp = true;
                await this.orderRepository.save(order);
            }
        }
        if (!newTp) {
            return;
        }
        const completeds = this.subscription.orders.filter((order) => order.isCompleted);
        const quantitySum = completeds.reduce((acc, order) => acc + order.quantity * 1, 0);
        const avg = await this.getTakeProfitByOrders(symbol, completeds);
        for (const order of this.subscription.orders) {
            if (order.isCompleted) {
                order.takeProfit = avg;
                await this.orderRepository.save(order);
            }
        }
        try {
            openedOrders = (await this.getOrders(symbol)).data;
        }
        catch (e) {
            console.log(e);
        }
        for (const order of openedOrders) {
            if (order.symbol === symbol && order.side === OrderSide_1.OrderSide.SELL) {
                await this.cancelOrder(symbol, order.orderId);
            }
        }
        console.log('new TP: ' + symbol + ' Price: ' + avg + ' Quantity: ' + quantitySum);
        const balance = await this.getBalanceBaseAssetQuantity(exchangeInfo);
        if (balance !== quantitySum) {
            console.log('Кол-во купленного и кол-во в БД различаются');
        }
        await this.sellLimit(symbol, avg, balance);
    }
    async getExchangeInfo() {
        let exchangeInfo = (await this.cacheManager.get('ExchangeInfo'));
        if (exchangeInfo === undefined) {
            const marketService = new market_1.Market({ apiKey: '', apiSecret: '' });
            exchangeInfo = (await marketService.exchangeInfo()).data.symbols;
            await this.cacheManager.set('ExchangeInfo', exchangeInfo, 86400000);
        }
        return exchangeInfo;
    }
    async filterExchangeInfo(symbol, filterName) {
        const exchangeInfo = await this.getExchangeInfoBySymbol(symbol);
        return exchangeInfo.filters.find((el) => el.filterType === filterName);
    }
    async gridBuy(symbol, price) {
        const { MARTINGALE, GRID_ORDER_DISTANCE, FIRST_ORDER } = this.params;
        let { GRID_MAX_ORDERS } = this.params;
        let lastOrder;
        if (this.subscription.orders?.length >= GRID_MAX_ORDERS) {
            return;
        }
        else {
            GRID_MAX_ORDERS -= this.subscription.orders?.length ?? 0;
            lastOrder = this.subscription.orders[this.subscription.orders?.length - 1];
        }
        const exchangeInfo = await this.getExchangeInfoBySymbol(symbol);
        if (exchangeInfo === null) {
            throw new Error('Error when receiving exchange info');
        }
        const COMMISSION = 0.1;
        let balance = (await this.getBalanceAsset(exchangeInfo.quoteAsset)).free * 1;
        const PRICE_FILTER = await this.filterExchangeInfo(symbol, 'PRICE_FILTER');
        const pricePrecision = this.getPrecision(PRICE_FILTER.tickSize);
        let quantity;
        if (this.subscription.orders?.length) {
            quantity = lastOrder.quantity * MARTINGALE;
            price -= (lastOrder.price / 100) * GRID_ORDER_DISTANCE;
        }
        else {
            quantity = ((balance / 100) * FIRST_ORDER) / price;
        }
        const orders = [];
        for (let i = 0; i < GRID_MAX_ORDERS; i++) {
            price = price - (price % PRICE_FILTER.tickSize);
            price = Number(price.toFixed(pricePrecision));
            balance -= quantity * price - ((quantity * price) / 100) * COMMISSION;
            if (balance < 0 || quantity == 0) {
                console.log('Недостаточно средств на счете');
                break;
            }
            const order = this.orderRepository.create({
                subscription: this.subscription,
                price: price,
                quantity: quantity,
            });
            orders.push(order);
            price -= (price / 100) * GRID_ORDER_DISTANCE;
            quantity = await this.fixQuantity(symbol, quantity * MARTINGALE);
        }
        orders[0].takeProfit = await this.getTakeProfitByOrders(symbol, [orders[0]]);
        for (const order of orders) {
            console.log(123);
            if (this.subscription.orders.length) {
                console.log(symbol, order.price, order.quantity);
                await this.buyLimit(symbol, order.price, order.quantity);
            }
            else {
                const quoteAssetQuantity = order.quantity * price;
                console.log(symbol, order.price, order.quantity);
                await this.buyMarket(symbol, order.quantity);
                await this.sellLimit(symbol, order.takeProfit, await this.getBalanceBaseAssetQuantity(exchangeInfo));
            }
            await this.orderRepository.save(order);
            this.subscription.orders.push(order);
            console.log('Пара: ' + symbol + ' Price: ' + order.price + ' TP: ' + order.takeProfit + ' Кол-во: ' + order.quantity);
        }
    }
    async fixQuantity(symbol, quantity) {
        const LOT_SIZE = await this.filterExchangeInfo(symbol, 'LOT_SIZE');
        const lotPrecision = this.getPrecision(LOT_SIZE.stepSize);
        quantity = LOT_SIZE.stepSize * Math.floor(quantity / LOT_SIZE.stepSize);
        return Number(quantity.toFixed(lotPrecision));
    }
    async getWallet() {
        const tradeService = new trade_1.Trade({
            apiKey: this.client.apiKey,
            apiSecret: this.client.apiSecret,
        });
        return (await tradeService.account()).data.balances;
    }
    getPrecision(tickSize) {
        tickSize = Number(tickSize);
        let precision = 0;
        while (tickSize * 10 < 1) {
            tickSize *= 10;
            precision++;
        }
        return precision;
    }
    async getBalanceAsset(asset) {
        const wallet = await this.getWallet();
        return wallet.find((el) => el.asset === asset.toUpperCase());
    }
    async getExchangeInfoBySymbol(symbol) {
        const infos = await this.getExchangeInfo();
        const index = infos.findIndex((el) => el.symbol === symbol.toUpperCase());
        return index !== -1 ? infos[index] : null;
    }
    async getTakeProfitByOrders(symbol, orders) {
        let avgPrice = orders.reduce((acc, el) => acc + Number(el.price), 0);
        avgPrice = avgPrice / orders.length;
        return await this.getTakeProfit(symbol, avgPrice);
    }
};
exports.TradeService = TradeService;
exports.TradeService = TradeService = __decorate([
    (0, common_1.Injectable)({
        scope: common_1.Scope.TRANSIENT,
    }),
    __metadata("design:paramtypes", [subscription_entity_1.Subscription, Object, typeorm_1.Repository,
        typeorm_1.Repository])
], TradeService);
//# sourceMappingURL=trade.service.js.map