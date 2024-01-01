import { Strategy } from '../entities/strategy.entity';
import { DataSource, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';
import { Subject } from 'rxjs';
export declare class StrategySubscriber implements EntitySubscriberInterface<Strategy> {
    afterLoad$: Subject<Strategy>;
    afterUpdate$: Subject<Strategy>;
    afterInsert$: Subject<Strategy>;
    constructor(dataSource: DataSource);
    listenTo(): typeof Strategy;
    afterLoad(entity: Strategy): void;
    afterUpdate(event: UpdateEvent<Strategy>): void;
    afterInsert(event: InsertEvent<Strategy>): void;
}
