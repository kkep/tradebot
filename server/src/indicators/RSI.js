"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RSI = void 0;
class RSI {
    constructor(period, data) {
        this.period = period;
        this.data = data;
    }
    calculate() {
        const changes = [];
        const gains = [];
        const losses = [];
        const data = this.data.splice(-1 * this.period);
        data.forEach((el) => {
            changes.push(el.close - el.open);
        });
        changes.forEach((el) => {
            if (el > 0) {
                gains.push(el);
                losses.push(0);
            }
            else {
                gains.push(0);
                losses.push(Math.abs(el));
            }
        });
        const avgGain = gains.reduce((acc, e) => acc + e, 0) / this.period;
        const avgLoss = losses.reduce((acc, e) => acc + e, 0) / this.period;
        const rs = avgGain / avgLoss;
        return 100 - 100 / (1 + rs);
    }
}
exports.RSI = RSI;
//# sourceMappingURL=RSI.js.map