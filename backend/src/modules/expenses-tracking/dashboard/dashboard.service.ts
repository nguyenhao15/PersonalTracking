import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../transactions/entities/transaction.entity';
import { Repository } from 'typeorm';
import { DashboardQueryDto } from './dto/handle-transaction.dto';
import { QueryUtils } from 'src/common/utils/query.utils';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async getStatistics(query: DashboardQueryDto) {
    const { startDate, endDate, groupBy, excludeHidden } = query;

    const qb = this.transactionRepository
      .createQueryBuilder('tx')
      .innerJoin('tx.category', 'category')
      .select(`DATE_TRUNC('${groupBy}', tx.date)`, 'timeGroup')
      .addSelect(
        'SUM(CASE WHEN category.type = "INCOME" THEN tx.amount ELSE 0 END)',
        'totalIncome',
      )
      .addSelect(
        'SUM(CASE WHEN category.type = "EXPENSE" THEN tx.amount ELSE 0 END)',
        'totalExpense',
      )
      .where(QueryUtils.applyOwnership<Transaction>()); // Áp dụng điều kiện sở hữu dữ liệu

    // Filter theo thời gian nếu người dùng truyền vào
    if (startDate) qb.andWhere('tx.date >= :startDate', { startDate });
    if (endDate) qb.andWhere('tx.date <= :endDate', { endDate });

    // Logic ẩn các category không muốn tính vào báo cáo
    if (excludeHidden) {
      qb.andWhere('category.includeInReport = :include', { include: true });
    }

    return qb.groupBy('timeGroup').orderBy('timeGroup', 'ASC').getRawMany(); // Trả về mảng object thô từ kết quả SUM/GROUP BY
  }
}
