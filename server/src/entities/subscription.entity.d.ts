import { Client } from './client.entity';
import { Strategy } from './strategy.entity';
import { ClientParam } from './clientParam.entity';
import { Order } from './order.entity';
export declare class Subscription {
    id: number;
    client: Client;
    strategy: Strategy;
    params: ClientParam[];
    orders: Order[];
    takeProfit: number;
    isActive: boolean;
}
