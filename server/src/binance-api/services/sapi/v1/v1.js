"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V1 = void 0;
const Sapi_1 = require("../Sapi");
class V1 extends Sapi_1.Sapi {
    constructor(_options) {
        super(_options);
        this.url += '/v1';
    }
}
exports.V1 = V1;
//# sourceMappingURL=v1.js.map