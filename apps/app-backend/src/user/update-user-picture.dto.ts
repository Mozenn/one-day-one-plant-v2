import { Transform } from 'class-transformer';

export class UpdateUserPictureDto {
  @Transform((val) => +val.value)
  userId: number;
  @Transform((val) => +val.value)
  plantId: number;
}
