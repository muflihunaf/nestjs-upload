import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { SharingModule } from './sharing/sharing.module';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [PrismaModule, UsersModule, SharingModule, DocumentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
