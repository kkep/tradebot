import { Param } from './param.entity';
import { Strategy } from './strategy.entity';
export declare class StrategyParam {
    id: number;
    strategy: Strategy;
    param: Param;
    value: string;
}
