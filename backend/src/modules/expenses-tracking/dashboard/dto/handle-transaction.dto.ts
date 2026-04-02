import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEnum, IsOptional } from 'class-validator';

export enum GroupBy {
  DAY = 'day',
  MONTH = 'month',
  QUARTER = 'quarter',
  YEAR = 'year',
}

export class DashboardQueryDto {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;

  @IsEnum(GroupBy)
  groupBy: GroupBy = GroupBy.DAY;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  excludeHidden: boolean = true; // Mặc định ẩn các loại thu chi đã chỉ định
}
