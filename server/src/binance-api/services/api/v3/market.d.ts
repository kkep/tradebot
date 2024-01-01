import { V3 } from './v3';
import { Options } from '../../../classes/options';
import { Interval } from '../../../enums/Interval';
export declare class Market extends V3 {
    constructor(options: Options);
    ping(): Promise<import("axios").AxiosResponse<any, any>>;
    time(): Promise<import("axios").AxiosResponse<any, any>>;
    exchangeInfo(options?: {
        symbol?: string;
        symbols?: string[];
    }): Promise<import("axios").AxiosResponse<any, any>>;
    depth(symbol: string, options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    trades(symbol: string, options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    historicalTrades(symbol: string, options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    aggTrades(symbol: string, options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    klines(symbol: string, interval: Interval, options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    uiklines(symbol: any, interval: any, options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    avgPrice(symbol: string): Promise<import("axios").AxiosResponse<any, any>>;
    ticker24hr(symbol?: string, symbols?: any[], type?: 'MINI' | 'FULL'): Promise<import("axios").AxiosResponse<any, any>>;
    tickerPrice(symbol?: string, symbols?: any[]): Promise<import("axios").AxiosResponse<any, any>>;
    bookTicker(symbol?: string, symbols?: any[]): Promise<import("axios").AxiosResponse<any, any>>;
    rollingWindowTicker(symbol?: string, symbols?: string[], options?: {}): Promise<import("axios").AxiosResponse<any, any>>;
}
