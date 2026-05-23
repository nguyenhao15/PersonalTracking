import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { CategoryType } from './category-type.enum';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(CategoryType)
  categoryType!: CategoryType;

  @IsBoolean()
  isActive?: boolean;

  @IsBoolean()
  includeInSummary?: boolean;
}
