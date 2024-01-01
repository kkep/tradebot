'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortObject = exports.randomString = exports.defaultLogger = exports.flowRight = exports.createRequest = exports.buildQueryString = exports.removeEmptyValue = exports.isEmptyValue = void 0;
const axios_1 = require("axios");
const node_console_1 = require("node:console");
const constants_1 = require("./constants");
const crypto = require("crypto");
const randomString = () => crypto.randomBytes(16).toString('hex');
exports.randomString = randomString;
const removeEmptyValue = (obj) => {
    if (!(obj instanceof Object))
        return {};
    Object.keys(obj).forEach((key) => isEmptyValue(obj[key]) && delete obj[key]);
    return obj;
};
exports.removeEmptyValue = removeEmptyValue;
const isEmptyValue = (input) => {
    return ((!input && input !== false && input !== 0) ||
        (typeof input === 'string' && /^\s+$/.test(input)) ||
        (input instanceof Object && !Object.keys(input).length) ||
        (Array.isArray(input) && !input.length));
};
exports.isEmptyValue = isEmptyValue;
const buildQueryString = (params) => {
    if (!params)
        return '';
    return Object.entries(params).map(stringifyKeyValuePair).join('&');
};
exports.buildQueryString = buildQueryString;
const stringifyKeyValuePair = ([key, value]) => {
    const valueString = Array.isArray(value) ? `["${value.join('","')}"]` : value;
    return `${key}=${encodeURIComponent(valueString)}`;
};
const getRequestInstance = (config) => {
    return axios_1.default.create({
        ...config,
    });
};
const createRequest = (config) => {
    const { baseURL, apiKey, method, url, timeout, proxy, httpsAgent } = config;
    return getRequestInstance({
        baseURL,
        timeout,
        proxy,
        httpsAgent,
        headers: {
            'Content-Type': 'application/json',
            'X-MBX-APIKEY': apiKey,
            'User-Agent': `${constants_1.default.appName}/${constants_1.default.appVersion}`,
        },
    }).request({
        method,
        url,
    });
};
exports.createRequest = createRequest;
const flowRight = (...functions) => (input) => functions.reduceRight((input, fn) => fn(input), input);
exports.flowRight = flowRight;
const defaultLogger = new node_console_1.Console({
    stdout: process.stdout,
    stderr: process.stderr,
});
exports.defaultLogger = defaultLogger;
const sortObject = (obj) => Object.keys(obj)
    .sort()
    .reduce((res, key) => {
    res[key] = obj[key];
    return res;
}, {});
exports.sortObject = sortObject;
//# sourceMappingURL=utils.js.map