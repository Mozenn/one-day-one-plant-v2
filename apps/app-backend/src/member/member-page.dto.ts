import { IsOptional } from 'class-validator';
import { PageDto } from 'src/shared/page.dto';

export class MemberPageDto extends PageDto {
  @IsOptional()
  username: string;
  @IsOptional()
  score: number;
}
