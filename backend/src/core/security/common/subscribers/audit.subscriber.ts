// src/common/subscribers/audit.subscriber.ts
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { BaseAuditEntity } from '../entities/base.entity';
import { ClsContextService } from '../clst_context.service';
import { log } from 'console';

@EventSubscriber()
export class AuditSubscriber implements EntitySubscriberInterface<BaseAuditEntity> {
  constructor(private dataSource: DataSource) {
    // Tự đăng ký Subscriber này vào DataSource hiện tại
    this.dataSource.subscribers.push(this);
  }
  listenTo() {
    return BaseAuditEntity; // Chỉ nghe các entity kế thừa từ BaseAuditEntity
  }

  beforeInsert(event: InsertEvent<BaseAuditEntity>) {
    const userName = ClsContextService.getUserName();
    log('Current User in beforeInsert:', userName);
    if (userName) {
      event.entity.createdBy = userName;
      event.entity.updatedBy = userName;
    }
  }

  beforeUpdate(event: UpdateEvent<BaseAuditEntity>) {
    if (!event.entity) return;
    const userName = ClsContextService.getUserName();
    log('Current User in beforeUpdate:', userName);
    if (userName) {
      event.entity.updatedBy = userName;
    }
  }
}
