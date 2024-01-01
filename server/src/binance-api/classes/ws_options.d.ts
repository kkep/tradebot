import { Options } from './options';
export interface WsOptions extends Options {
    wsURL?: string;
    callbacks?: {
        open: () => any;
        message: () => any;
        ping: () => any;
        pong: () => any;
        error: () => any;
        close: () => any;
    };
    reconnectDelay?: number;
}
