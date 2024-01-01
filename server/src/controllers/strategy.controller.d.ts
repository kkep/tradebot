import { Response } from 'express';
import { AppService } from '../app.service';
import { BaseStrategyEnum } from '../enums/baseStrategy.enum';
export declare class StrategyController {
    private readonly appService;
    constructor(appService: AppService);
    getBaseStrategyParams(baseStrategy: BaseStrategyEnum): Promise<import("../entities/param.entity").Param[]>;
    getBaseStrategyClientParams(baseStrategy: BaseStrategyEnum): Promise<import("../entities/param.entity").Param[]>;
    createStrategy(strategy: any, res: Response): Promise<void>;
    getStrategies(): Promise<import("../entities/strategy.entity").Strategy[]>;
    stopStrategy(strategyId: number): Promise<{
        success: boolean;
    }>;
    startStrategy(strategyId: number): Promise<{
        success: boolean;
    }>;
}
