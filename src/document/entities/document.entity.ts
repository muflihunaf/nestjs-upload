import { ApiProperty } from '@nestjs/swagger';
import { Document } from '@prisma/client';
import { SharingEntity } from 'src/sharing/entities/sharing.entity';

export class DocumentEntity implements Document {
  @ApiProperty()
  document_id: number;
  @ApiProperty()
  user_id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  file_path: string;
  @ApiProperty()
  upload_date: Date;

  @ApiProperty()
  shared_with: SharingEntity;

  constructor(partial: Partial<DocumentEntity>) {
    Object.assign(this, partial);
  }
}
