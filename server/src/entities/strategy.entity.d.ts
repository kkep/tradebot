import { Interval } from '../binance-api/enums/Interval';
import { BaseStrategyEnum } from '../enums/baseStrategy.enum';
import { Subscription } from './subscription.entity';
import { StrategyParam } from './strategyParam.entity';
export declare class Strategy {
    id: number;
    baseStrategy: BaseStrategyEnum;
    title: string;
    symbol: string;
    interval: Interval;
    min_deposit: number;
    params: StrategyParam[];
    isActive: boolean;
    trade: {
        isBuy: boolean;
        stopLoss: number;
        takeProfit: number;
    };
    subscriptions: Subscription[];
    getStreamName(): string;
}
