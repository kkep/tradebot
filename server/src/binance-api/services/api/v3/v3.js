"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V3 = void 0;
const api_1 = require("../api");
class V3 extends api_1.Api {
    constructor(_options) {
        super(_options);
        this.url += '/v3';
    }
}
exports.V3 = V3;
//# sourceMappingURL=v3.js.map