import { Transform } from 'class-transformer';
import { IsDate, IsOptional, MaxDate } from 'class-validator';
import { PageDto } from 'src/shared/page.dto';

export class PlantPageDto extends PageDto {
  @IsOptional()
  name: string;
  @IsOptional()
  scientificName: string;
  @IsOptional()
  family: string;
  @IsDate()
  @IsOptional()
  @MaxDate(new Date())
  startDate?: Date;
  @IsDate()
  @IsOptional()
  @MaxDate(new Date())
  endDate?: Date;
  @IsOptional()
  @Transform((val) => +val.value)
  userId: number;
}
