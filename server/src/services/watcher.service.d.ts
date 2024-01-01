import { StreamWS } from '../binance-api/services/ws/stream/ws_stream';
import { Market } from '../binance-api/services/api/v3/market';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class WatcherService {
    protected binanceStreamService: StreamWS;
    protected binanceMarketService: Market;
    private eventEmitter;
    private subscriptions;
    private readonly MAX_KLINES_LENGTH;
    private klines;
    constructor(binanceStreamService: StreamWS, binanceMarketService: Market, eventEmitter: EventEmitter2);
    subscribe(stream: string): void;
    unsubscribe(stream: string): void;
}
