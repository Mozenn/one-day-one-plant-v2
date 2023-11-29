import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { PageDto } from 'src/shared/page.dto';

export class UserPageDto extends PageDto {
  @IsOptional()
  username: string;
  @IsOptional()
  @Transform((val) => +val.value)
  score: number;
}
