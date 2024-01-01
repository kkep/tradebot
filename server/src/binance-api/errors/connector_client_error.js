"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("./error");
class ConnectorClientError extends error_1.default {
    constructor(errorMessage) {
        super(errorMessage);
        this.name = 'ConnectorClientError';
    }
}
exports.default = ConnectorClientError;
//# sourceMappingURL=connector_client_error.js.map