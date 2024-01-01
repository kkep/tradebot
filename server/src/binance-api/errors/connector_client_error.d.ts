import Error from './error';
export default class ConnectorClientError extends Error {
    name: string;
    constructor(errorMessage: string);
}
