import { Param } from './param.entity';
import { Client } from './client.entity';
import { Strategy } from './strategy.entity';
import { Subscription } from './subscription.entity';
export declare class ClientParam {
    id: number;
    client: Client;
    strategy: Strategy;
    param: Param;
    subscription: Subscription;
    value: string;
}
