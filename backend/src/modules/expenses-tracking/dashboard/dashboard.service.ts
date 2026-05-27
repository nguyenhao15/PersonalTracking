import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../transactions/entities/transaction.entity';
import { Repository } from 'typeorm';
import { DashboardQueryDto } from './dto/handle-transaction.dto';
import { QueryUtils } from 'src/common/utils/query.utils';
import { CategoryType } from '../categories/dto/category-type.enum';
import { log } from 'console';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async getStatistics(query: DashboardQueryDto) {
    const { startDate, endDate, groupBy, excludeHidden } = query;
    const options = QueryUtils.applyOwnership<Transaction>(); // Lấy điều kiện sở hữu dữ liệu cho user hiện tại
    const timeGroupExpr = `DATE_TRUNC('${groupBy}', tx.date)`;

    const qb = this.transactionRepository
      .createQueryBuilder('tx')
      .innerJoin('tx.category', 'category')
      .select(timeGroupExpr, 'timeGroup')
      .addSelect(
        'SUM(CASE WHEN tx.transactionType = :incomeType THEN tx.baseAmount ELSE 0 END)',
        'totalIncome',
      )
      .addSelect(
        'SUM(CASE WHEN tx.transactionType = :expenseType THEN tx.baseAmount ELSE 0 END)',
        'totalExpense',
      )
      .setParameters({
        incomeType: CategoryType.INCOME,
        expenseType: CategoryType.EXPENSE,
      })
      .setFindOptions({ where: options.where }); // Áp dụng điều kiện sở hữu dữ liệu
    // Filter theo thời gian nếu người dùng truyền vào
    if (startDate) qb.andWhere('tx.date >= :startDate', { startDate });
    if (endDate) qb.andWhere('tx.date <= :endDate', { endDate });

    // Logic ẩn các category không muốn tính vào báo cáo
    if (excludeHidden) {
      qb.andWhere('category.includeInSummary = :include', { include: true });
    }

    return qb.groupBy(timeGroupExpr).orderBy(timeGroupExpr, 'ASC').getRawMany(); // Trả về mảng object thô từ kết quả SUM/GROUP BY
  }
}
