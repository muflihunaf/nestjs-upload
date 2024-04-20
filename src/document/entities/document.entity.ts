import { ApiProperty } from '@nestjs/swagger';
import { Document } from '@prisma/client';
import { SharingEntity } from 'src/sharing/entities/sharing.entity';
import { UserEntity } from 'src/users/entities/user.entity';

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

  // constructor({ shared_with, ...data }: Partial<DocumentEntity>) {
  //   Object.assign(this, data);

  //   if (shared_with.shared_by_user) {
  //     this.shared_with.shared_by_user = new UserEntity(
  //       shared_with.shared_by_user,
  //     );
  //   }
  // }
}
