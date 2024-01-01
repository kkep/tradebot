"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sapi = void 0;
const base_1 = require("../base");
class Sapi extends base_1.Base {
    constructor(_options) {
        super(_options);
        this.url += '/sapi';
    }
}
exports.Sapi = Sapi;
//# sourceMappingURL=Sapi.js.map