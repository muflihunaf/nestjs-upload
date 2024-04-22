import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [DocumentController],
  providers: [DocumentService],
  imports: [PrismaModule, CloudinaryModule],
  exports: [DocumentService],
})
export class DocumentModule {}
