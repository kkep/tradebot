"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bswap = void 0;
const v1_1 = require("./v1");
const RequestMethod_1 = require("../../../enums/RequestMethod");
const validation_1 = require("../../../helpers/validation");
class Bswap extends v1_1.V1 {
    constructor(_options) {
        super(_options);
        this.url += '/bswap';
    }
    pools() {
        return this.signRequest(RequestMethod_1.RequestMethod.GET, '/pools');
    }
    liquidity(options = {}) {
        return this.signRequest(RequestMethod_1.RequestMethod.GET, '/liquidity', options);
    }
    liquidityAdd(poolId, asset, quantity, options = {}) {
        (0, validation_1.validateRequiredParameters)({ poolId, asset, quantity });
        return this.signRequest(RequestMethod_1.RequestMethod.POST, '/liquidityAdd', Object.assign(options, {
            poolId,
            asset,
            quantity,
        }));
    }
    liquidityRemove(poolId, type, asset, shareAmount, options = {}) {
        (0, validation_1.validateRequiredParameters)({ poolId, type, asset, shareAmount });
        return this.signRequest(RequestMethod_1.RequestMethod.GET, '/liquidityRemove', Object.assign(options, {
            poolId,
            type,
            asset,
            shareAmount,
        }));
    }
    liquidityOperationRecord(options = {}) {
        return this.signRequest(RequestMethod_1.RequestMethod.GET, '/liquidityOps', options);
    }
    requestQuote(quoteAsset, baseAsset, quoteQty, options = {}) {
        (0, validation_1.validateRequiredParameters)({ quoteAsset, baseAsset, quoteQty });
        return this.signRequest(RequestMethod_1.RequestMethod.GET, '/quote', Object.assign(options, {
            quoteAsset,
            baseAsset,
            quoteQty,
        }));
    }
    swap(quoteAsset, baseAsset, quoteQty, options = {}) {
        (0, validation_1.validateRequiredParameters)({ quoteAsset, baseAsset, quoteQty });
        return this.signRequest(RequestMethod_1.RequestMethod.POST, '/swap', Object.assign(options, {
            quoteAsset,
            baseAsset,
            quoteQty,
        }));
    }
    swapHistory(options = {}) {
        return this.signRequest(RequestMethod_1.RequestMethod.GET, '/swap', options);
    }
    getPoolConfig(options = {}) {
        return this.signRequest(RequestMethod_1.RequestMethod.GET, '/poolConfigure', options);
    }
    addLiquidityPreview(poolId, type, quoteAsset, quoteQty, options = {}) {
        (0, validation_1.validateRequiredParameters)({ poolId, type, quoteAsset, quoteQty });
        return this.signRequest(RequestMethod_1.RequestMethod.GET, '/addLiquidityPreview', Object.assign(options, { poolId, type, quoteAsset, quoteQty }));
    }
    removeLiquidityPreview(poolId, type, quoteAsset, shareAmount, options = {}) {
        (0, validation_1.validateRequiredParameters)({ poolId, type, quoteAsset, shareAmount });
        return this.signRequest(RequestMethod_1.RequestMethod.GET, '/removeLiquidityPreview', Object.assign(options, { poolId, type, quoteAsset, shareAmount }));
    }
    unclaimedRewards(options = {}) {
        return this.signRequest(RequestMethod_1.RequestMethod.GET, '/unclaimedRewards', options);
    }
    claimRewards(options = {}) {
        return this.signRequest(RequestMethod_1.RequestMethod.POST, '/claimRewards', options);
    }
    claimedHistory(options = {}) {
        return this.signRequest(RequestMethod_1.RequestMethod.GET, '/claimedHistory', options);
    }
}
exports.Bswap = Bswap;
//# sourceMappingURL=bswap.js.map