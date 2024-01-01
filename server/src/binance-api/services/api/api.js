"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const base_1 = require("../base");
class Api extends base_1.Base {
    constructor(_options) {
        super(_options);
        this.url += '/api';
    }
}
exports.Api = Api;
//# sourceMappingURL=api.js.map