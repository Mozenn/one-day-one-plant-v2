import { IsIn, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class PageDto {
  @Transform((val) => +val.value)
  @Min(0)
  page: number;
  @Transform((val) => +val.value)
  @Min(1)
  elementsPerPage: number;
  @IsIn(['asc', 'dsc'])
  direction: string = 'asc';
  key: string;
}
