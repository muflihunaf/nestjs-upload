import { Injectable } from '@nestjs/common';
import { CreateSharingDto } from './dto/create-sharing.dto';
import { UpdateSharingDto } from './dto/update-sharing.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SharingService {
  constructor(private prisma: PrismaService) {}
  create(createSharingDto: CreateSharingDto) {
    return '';
  }

  findAll() {
    return this.prisma.sharing.findMany({
      include: {
        shared_by_user: true,
        shared_with_user: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} sharing`;
  }

  update(id: number, updateSharingDto: UpdateSharingDto) {
    return `This action updates a #${id} sharing`;
  }

  remove(id: number) {
    return `This action removes a #${id} sharing`;
  }
}
