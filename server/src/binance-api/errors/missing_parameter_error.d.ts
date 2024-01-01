import Error from './error';
export declare class MissingParameterError extends Error {
    name: string;
    constructor(paramNames?: any);
}
