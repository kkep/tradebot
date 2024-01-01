import { BaseWS } from '../ws_base';
import { WsOptions } from '../../../classes/ws_options';
export declare class ApiWS extends BaseWS {
    protected _options: WsOptions;
    constructor(options: WsOptions);
    sendMessageWithAPIKey(method: any, options?: any): void;
    sendMessage(method: any, options?: any): void;
    sendSignatureMessage(method: any, options?: any): void;
}
