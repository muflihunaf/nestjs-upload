import { ApiProperty } from '@nestjs/swagger';
import { Sharing } from '@prisma/client';
import { UserEntity } from 'src/users/entities/user.entity';

export class SharingEntity implements Sharing {
  @ApiProperty()
  sharing_id: number;

  @ApiProperty()
  document_id: number;

  @ApiProperty()
  shared_with_user_id: number;

  @ApiProperty()
  shared_with_user: UserEntity;

  @ApiProperty()
  permission_level: string;

  @ApiProperty()
  shared_by_user_id: number;

  @ApiProperty()
  shared_by_user: UserEntity;

  constructor({
    shared_with_user,
    shared_by_user,
    ...data
  }: Partial<SharingEntity>) {
    Object.assign(this, data);

    if (shared_with_user) {
      this.shared_with_user = new UserEntity(shared_with_user);
    }

    if (shared_by_user) {
      this.shared_by_user = new UserEntity(shared_by_user);
    }
  }
}
