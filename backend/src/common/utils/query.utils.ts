// src/common/utils/query.utils.ts
import { ClsContextService } from 'src/core/security/common/clst_context.service';
import { BaseAuditEntity } from 'src/core/security/common/entities/base.entity';
import { FindManyOptions, FindOptionsWhere } from 'typeorm';

export class QueryUtils {
  static applyOwnership<T extends BaseAuditEntity>(
    options: FindManyOptions<T> = {},
  ): FindManyOptions<T> {
    const userName = ClsContextService.getUserName();

    if (!userName) {
      return { ...options, where: { id: -1 } as any };
    }

    const ownerShipCondition = { createdBy: userName } as FindOptionsWhere<T>;

    if (options.where) {
      if (Array.isArray(options.where)) {
        options.where = options.where.map((condition) => ({
          ...condition,
          ...ownerShipCondition,
        }));
      } else {
        // Trường hợp where là object đơn lẻ
        options.where = {
          ...options.where,
          ...ownerShipCondition,
        } as FindOptionsWhere<T>;
      }
    } else {
      options.where = ownerShipCondition;
    }

    return options;
  }
}
