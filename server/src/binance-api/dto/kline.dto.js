"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KlineDto = void 0;
class KlineDto {
    constructor(data) {
        this.openTime = Number(data[0]);
        this.open = Number(data[1]);
        this.high = Number(data[2]);
        this.low = Number(data[3]);
        this.close = Number(data[4]);
        this.volume = Number(data[5]);
        this.closeTime = Number(data[6]);
        this.quote = Number(data[7]);
        this.trades = Number(data[8]);
        this.baseAssetVolume = Number(data[9]);
        this.baseQuoteVolume = Number(data[10]);
        this.unusedField = Boolean(data[11]);
    }
}
exports.KlineDto = KlineDto;
//# sourceMappingURL=kline.dto.js.map