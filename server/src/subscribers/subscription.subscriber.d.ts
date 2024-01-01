import { DataSource, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';
import { Subscription } from '../entities/subscription.entity';
import { Subject } from 'rxjs';
export declare class SubscriptionSubscriber implements EntitySubscriberInterface<Subscription> {
    afterLoad$: Subject<Subscription>;
    afterUpdate$: Subject<Subscription>;
    afterInsert$: Subject<Subscription>;
    constructor(dataSource: DataSource);
    listenTo(): typeof Subscription;
    afterLoad(entity: Subscription): Promise<any> | void;
    afterUpdate(event: UpdateEvent<Subscription>): void;
    afterInsert(event: InsertEvent<Subscription>): void;
}
