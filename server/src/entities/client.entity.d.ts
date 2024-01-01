import { Subscription } from './subscription.entity';
import { ClientParam } from "./clientParam.entity";
export declare class Client {
    id: number;
    apiKey: string;
    apiSecret: string;
    params: ClientParam;
    subscriptions: Subscription[];
}
