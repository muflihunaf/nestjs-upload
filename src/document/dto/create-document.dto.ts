import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class CreateDocumentDto {
  user_id: number;

  @IsString()
  @ApiProperty({ required: true })
  title: string;

  @IsString()
  @ApiProperty({ required: true })
  description: string;

  @IsString()
  @ApiProperty({ required: true })
  file_path: string;

  @IsDateString()
  @ApiProperty({ default: new Date() })
  upload_date: Date;
}
