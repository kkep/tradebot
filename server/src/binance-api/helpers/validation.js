'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasOneOfParameters = exports.validateRequiredParameters = void 0;
const utils_1 = require("./utils");
const missing_parameter_error_1 = require("../errors/missing_parameter_error");
const validateRequiredParameters = (paramObject) => {
    if (!paramObject || (0, utils_1.isEmptyValue)(paramObject)) {
        throw new missing_parameter_error_1.MissingParameterError();
    }
    const emptyParams = [];
    Object.keys(paramObject).forEach((param) => {
        if ((0, utils_1.isEmptyValue)(paramObject[param])) {
            emptyParams.push(param);
        }
    });
    if (emptyParams.length) {
        throw new missing_parameter_error_1.MissingParameterError(emptyParams);
    }
};
exports.validateRequiredParameters = validateRequiredParameters;
const hasOneOfParameters = (paramObject) => {
    if (!paramObject || (0, utils_1.isEmptyValue)(paramObject)) {
        throw new missing_parameter_error_1.MissingParameterError();
    }
    const params = Object.values(paramObject);
    if (params.every(utils_1.isEmptyValue)) {
        throw new missing_parameter_error_1.MissingParameterError(Object.keys(paramObject));
    }
};
exports.hasOneOfParameters = hasOneOfParameters;
//# sourceMappingURL=validation.js.map