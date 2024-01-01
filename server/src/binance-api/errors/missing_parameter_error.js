"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingParameterError = void 0;
const error_1 = require("./error");
class MissingParameterError extends error_1.default {
    constructor(paramNames) {
        super(`One or more of required parameters is missing: ${paramNames ? paramNames.slice().join(', ') : ''} `);
        this.name = 'MissingParameterError';
    }
}
exports.MissingParameterError = MissingParameterError;
//# sourceMappingURL=missing_parameter_error.js.map