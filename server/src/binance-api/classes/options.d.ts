import { PrivateKeyAlgo } from '../enums/PrivateKeyAlgo';
export interface Options {
    apiKey: string;
    apiSecret: string;
    baseURL?: string;
    logger?: any;
    timeout?: number;
    proxy?: any;
    httpsAgent?: any;
    privateKey?: string;
    privateKeyPassphrase?: string;
    privateKeyAlgo?: PrivateKeyAlgo;
}
