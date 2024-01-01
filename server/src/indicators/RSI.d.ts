import { Indicator } from './Indicator';
import { KlineInterface } from '../binance-api/dto/KlineInterface';
export declare class RSI implements Indicator {
    period: number;
    data: KlineInterface[];
    constructor(period: number, data: KlineInterface[]);
    calculate(): number;
}
