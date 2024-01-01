import { Subscription } from './subscription.entity';
export declare class Order {
    id: number;
    subscription: Subscription;
    price: number;
    quantity: number;
    takeProfit: number;
    isCompleted: boolean;
}
