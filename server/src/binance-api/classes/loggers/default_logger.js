"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_console_1 = require("node:console");
class DefaultLogger {
    constructor() {
        return new node_console_1.Console({
            stdout: process.stdout,
            stderr: process.stderr,
        });
    }
}
exports.default = DefaultLogger;
//# sourceMappingURL=default_logger.js.map