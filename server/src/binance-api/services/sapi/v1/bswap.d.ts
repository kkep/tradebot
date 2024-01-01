import { Options } from '../../../classes/options';
import { V1 } from './v1';
export declare class Bswap extends V1 {
    constructor(_options: Options);
    pools(): Promise<import("axios").AxiosResponse<any, any>>;
    liquidity(options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    liquidityAdd(poolId: number, asset: string, quantity: number, options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    liquidityRemove(poolId: number, type: any, asset: any, shareAmount: number, options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    liquidityOperationRecord(options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    requestQuote(quoteAsset: any, baseAsset: any, quoteQty: any, options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    swap(quoteAsset: any, baseAsset: any, quoteQty: any, options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    swapHistory(options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    getPoolConfig(options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    addLiquidityPreview(poolId: any, type: any, quoteAsset: any, quoteQty: any, options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    removeLiquidityPreview(poolId: number, type: any, quoteAsset: string, shareAmount: number, options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    unclaimedRewards(options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    claimRewards(options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    claimedHistory(options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
}
