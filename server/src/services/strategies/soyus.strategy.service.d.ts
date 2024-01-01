import { RequiredParam, StrategyService } from "./strategy.service";
import { BaseStrategyEnum } from '../../enums/baseStrategy.enum';
import { Interval } from '../../binance-api/enums/Interval';
import { KlineWsDto } from '../../binance-api/dto/kline_ws.dto';
export declare class SoyusStrategyService extends StrategyService {
    protected readonly name: BaseStrategyEnum;
    protected requiredParams: RequiredParam;
    protected clientRequiredParams: RequiredParam;
    trade(symbol: string, interval: Interval, klines: Map<number, KlineWsDto>): void;
}
