"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
const crypto = require("crypto");
const PrivateKeyAlgo_1 = require("../enums/PrivateKeyAlgo");
const utils_1 = require("../helpers/utils");
const connector_client_error_1 = require("../errors/connector_client_error");
const default_logger_1 = require("../classes/loggers/default_logger");
const common_1 = require("@nestjs/common");
let Base = class Base {
    constructor(_options) {
        this._options = _options;
        this.url = '';
        this._options.timeout = this._options.timeout || 0;
        this._options.baseURL = this._options.baseURL || 'https://api.binance.com';
        this._options.proxy = this._options.proxy || false;
        this._options.logger = this._options.logger || new default_logger_1.default();
        this._options.privateKey = this._options.privateKey || '';
        this._options.privateKeyPassphrase =
            this._options.privateKeyPassphrase || '';
        this._options.privateKeyAlgo =
            this._options.privateKeyAlgo || PrivateKeyAlgo_1.PrivateKeyAlgo.RSA;
    }
    publicRequest(method, path, params = {}) {
        params = (0, utils_1.removeEmptyValue)(params);
        params = (0, utils_1.buildQueryString)(params);
        path = this.url + path;
        if (params !== '') {
            path = `${path}?${params}`;
        }
        return (0, utils_1.createRequest)({
            method,
            baseURL: this._options.baseURL,
            url: path,
            apiKey: this._options.apiKey,
            timeout: this._options.timeout,
            proxy: this._options.proxy,
            httpsAgent: this._options.httpsAgent,
        });
    }
    signRequest(method, path, params = {}) {
        params = (0, utils_1.removeEmptyValue)(params);
        const timestamp = Date.now();
        const queryString = (0, utils_1.buildQueryString)({ ...params, timestamp });
        let signature;
        if (!this._options.privateKey) {
            signature = crypto
                .createHmac('sha256', this._options.apiSecret)
                .update(queryString)
                .digest('hex');
        }
        else {
            if (this._options.privateKeyAlgo === PrivateKeyAlgo_1.PrivateKeyAlgo.RSA) {
                signature = crypto
                    .sign('RSA-SHA256', Buffer.from(queryString), {
                    key: this._options.privateKey,
                    passphrase: this._options.privateKeyPassphrase,
                })
                    .toString('base64');
            }
            else if (this._options.privateKeyAlgo === PrivateKeyAlgo_1.PrivateKeyAlgo.ED25519) {
                signature = crypto
                    .sign(null, Buffer.from(queryString), {
                    key: this._options.privateKey,
                    padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
                    saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST,
                })
                    .toString('base64');
            }
            else {
                throw new connector_client_error_1.default("privateKeyAlgo must be either 'RSA' or 'ED25519'");
            }
            signature = encodeURIComponent(signature);
        }
        return (0, utils_1.createRequest)({
            method,
            baseURL: this._options.baseURL,
            url: this.url + `${path}?${queryString}&signature=${signature}`,
            apiKey: this._options.apiKey,
            timeout: this._options.timeout,
            proxy: this._options.proxy,
            httpsAgent: this._options.httpsAgent,
        });
    }
};
exports.Base = Base;
exports.Base = Base = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], Base);
//# sourceMappingURL=base.js.map