import { Options } from '../classes/options';
import { RequestMethod } from '../enums/RequestMethod';
export declare class Base {
    protected _options: Options;
    protected url: string;
    constructor(_options: Options);
    publicRequest(method: RequestMethod, path: string, params?: {}): Promise<import("axios").AxiosResponse<any, any>>;
    signRequest(method: RequestMethod, path: string, params?: {}): Promise<import("axios").AxiosResponse<any, any>>;
}
