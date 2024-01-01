import { DynamicModule } from '@nestjs/common';
import { Options } from './classes/options';
import { WsOptions } from './classes/ws_options';
import { WsStreamOptions } from './classes/ws_stream_options';
export declare class BinanceApiModule {
    static forRoot(options: Options | WsOptions | WsStreamOptions): DynamicModule;
}
