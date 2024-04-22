import { Module } from '@nestjs/common';
import { SharingService } from './sharing.service';
import { SharingController } from './sharing.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DocumentModule } from 'src/document/document.module';

@Module({
  controllers: [SharingController],
  providers: [SharingService],
  imports: [PrismaModule, DocumentModule],
})
export class SharingModule {}
