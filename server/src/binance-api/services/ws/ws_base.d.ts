import { Base } from '../base';
import { WsOptions } from '../../classes/ws_options';
import { Observable, Subject } from 'rxjs';
export declare class BaseWS extends Base {
    protected callbacks: any;
    protected reconnectDelay: number;
    protected wsConnection: any;
    subscribeToOpen: Observable<any>;
    subscribeToMessage: Observable<any>;
    onMessage$: Subject<unknown>;
    onOpen$: Subject<unknown>;
    constructor(options: WsOptions);
    isConnected(): boolean;
    initConnect(url: string): void;
    disconnect(): void;
    pingServer(): void;
    send(payload: string): void;
}
