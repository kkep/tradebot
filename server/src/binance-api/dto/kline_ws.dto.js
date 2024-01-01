"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KlineWsDto = void 0;
class KlineWsDto {
    constructor(data) {
        const k = data.k;
        this.symbol = data.s;
        this.interval = k.i;
        this.openTime = Number(k.t);
        this.lastTime = data.E;
        this.open = Number(k.o);
        this.high = Number(k.h);
        this.low = Number(k.l);
        this.close = Number(k.c);
        this.volume = Number(k.v);
        this.closeTime = Number(k.T);
        this.quote = Number(k.q);
        this.trades = Number(k.n);
        this.baseAssetVolume = Number(k.V);
        this.baseQuoteVolume = Number(k.Q);
        this.unusedField = Boolean(k.B);
    }
}
exports.KlineWsDto = KlineWsDto;
//# sourceMappingURL=kline_ws.dto.js.map