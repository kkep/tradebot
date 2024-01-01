import { Interval } from "../enums/Interval";
import { KlineInterface } from './KlineInterface';
export declare class KlineWsDto implements KlineInterface {
    readonly symbol: string;
    readonly openTime: number;
    readonly lastTime: number;
    readonly interval: Interval;
    readonly open: number;
    readonly high: number;
    readonly low: number;
    readonly close: number;
    readonly volume: number;
    readonly closeTime: number;
    readonly quote: number;
    readonly trades: number;
    readonly baseAssetVolume: number;
    readonly baseQuoteVolume: number;
    readonly unusedField: boolean;
    constructor(data: any);
}
