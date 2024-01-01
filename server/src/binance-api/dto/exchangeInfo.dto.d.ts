import { ExchangeInfoSymbolDto } from './exchangeInfoSymbol.dto';
export declare class ExchangeInfoDto {
    readonly timezone: string;
    serverTime: number;
    rateLimits: Array<any>;
    exchangeFilters: Array<any>;
    symbols: Array<ExchangeInfoSymbolDto>;
}
