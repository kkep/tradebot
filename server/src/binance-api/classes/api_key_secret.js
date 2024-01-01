"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeySecret = void 0;
class ApiKeySecret {
    constructor(_key, _secret) {
        this._key = _key;
        this._secret = _secret;
    }
    get key() {
        return this._key;
    }
    get secret() {
        return this._secret;
    }
}
exports.ApiKeySecret = ApiKeySecret;
//# sourceMappingURL=api_key_secret.js.map