import { RequiredParam, StrategyService } from './strategy.service';
import { BaseStrategyEnum } from '../../enums/baseStrategy.enum';
import { KlineWsDto } from '../../binance-api/dto/kline_ws.dto';
import { Interval } from '../../binance-api/enums/Interval';
export declare class ApoloStrategyService extends StrategyService {
    protected readonly name: BaseStrategyEnum;
    protected requiredParams: RequiredParam;
    protected clientRequiredParams: RequiredParam;
    trade(symbol: string, interval: Interval, klines: Map<number, KlineWsDto>): void;
    checkOrder(symbol: string, interval: Interval, klines: Map<number, KlineWsDto>, kline: KlineWsDto): void;
}
