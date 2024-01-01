import { Indicator } from './Indicator';
export declare class MA implements Indicator {
    period: number;
    data: {
        open: number;
        close: number;
    }[];
    constructor(period: number, data: {
        open: number;
        close: number;
    }[]);
    calculate(): number;
}
