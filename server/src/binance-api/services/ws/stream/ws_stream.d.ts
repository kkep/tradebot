import { BaseWS } from '../ws_base';
import { WsStreamOptions } from '../../../classes/ws_stream_options';
export declare class StreamWS extends BaseWS {
    protected _options: WsStreamOptions;
    constructor(options: WsStreamOptions);
    private _prepareURL;
    subscribe(stream: string | string[]): void;
    getSubscriptions(): void;
    unsubscribe(stream: string | string[]): void;
}
