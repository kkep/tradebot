"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MA = void 0;
class MA {
    constructor(period, data) {
        this.period = period;
        this.data = data;
    }
    calculate() {
        const sum = this.data
            .slice(-1 * this.period)
            .reduce((acc, el) => acc + el.close, 0);
        return sum / this.period;
    }
}
exports.MA = MA;
//# sourceMappingURL=MA.js.map