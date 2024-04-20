import { Module } from '@nestjs/common';
import { SharingService } from './sharing.service';
import { SharingController } from './sharing.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SharingController],
  providers: [SharingService],
  imports: [PrismaModule],
})
export class SharingModule {}
