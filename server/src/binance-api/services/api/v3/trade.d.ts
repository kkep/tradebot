import { V3 } from './v3';
import { OrderType } from '../../../enums/OrderType';
import { OrderSide } from '../../../enums/OrderSide';
export declare class Trade extends V3 {
    newOrderTest(symbol: string, side: OrderSide, type: OrderType, options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    newOrder(symbol: any, side: any, type: any, options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    cancelOrder(symbol: string, options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    cancelOpenOrders(symbol: any, options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    getOrder(symbol: any, options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    cancelAndReplace(symbol: any, side: any, type: any, cancelReplaceMode: any, options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    openOrders(options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    allOrders(symbol: any, options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    newOCOOrder(symbol: any, side: any, quantity: any, price: any, stopPrice: any, options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    cancelOCOOrder(symbol: any, options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    getOCOOrder(options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    getOCOOrders(options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    getOpenOCOOrders(options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    account(options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    myTrades(symbol: any, options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    orderCount(options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
}
