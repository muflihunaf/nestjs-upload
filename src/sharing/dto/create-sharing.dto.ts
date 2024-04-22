import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateSharingDto {
  shared_by_user_id: number;

  @IsInt()
  @ApiProperty({ required: true })
  document_id: number;

  @IsInt()
  @ApiProperty({ required: true })
  shared_with_user_id: number;

  @IsString()
  @ApiProperty({ required: true, enum: ['Read', 'Write'] })
  permission_level: string;

  constructor(userId: number) {
    this.shared_by_user_id = userId;
  }
}
