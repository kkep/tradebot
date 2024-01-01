import { V1 } from './v1';
import { Options } from '../../../classes/options';
export declare class Blvt extends V1 {
    constructor(options: Options);
    blvtInfo(options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    subscribeBlvt(tokenName: any, cost: any, options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    blvtSubscriptionRecord(options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    redeemBlvt(tokenName: any, amount: any, options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    blvtRedemptionRecord(options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
}
