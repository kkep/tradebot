import { Response } from 'express';
import { AppService } from "../app.service";
export declare class ClientController {
    private readonly appService;
    constructor(appService: AppService);
    createClient(clientData: {
        apiKey: string;
        apiSecret: string;
    }, res: Response): Promise<void>;
    subscribeToStrategy(subscription: any, clientId: any, res: Response): Promise<void>;
}
