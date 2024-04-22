import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSharingDto } from './dto/create-sharing.dto';
import { UpdateSharingDto } from './dto/update-sharing.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SharingService {
  constructor(private prisma: PrismaService) {}
  async create(createSharingDto: CreateSharingDto) {
    const document = await this.prisma.document.findUnique({
      where: { document_id: createSharingDto.document_id },
    });
    console.log(createSharingDto.shared_by_user_id);
    if (!document) {
      throw new NotFoundException(
        `Document with id ${createSharingDto.document_id} not found`,
      );
    }

    if (document.user_id !== createSharingDto.shared_by_user_id) {
      throw new ForbiddenException(
        `User ${createSharingDto.shared_by_user_id} is not authorized to access document ${document.title}`,
      );
    }

    return this.prisma.sharing.create({ data: createSharingDto });
  }

  async findAll(userId: number) {
    return await this.prisma.sharing.findMany({
      where: {
        OR: [{ shared_with_user_id: userId }, { shared_by_user_id: userId }],
      },
      include: {
        shared_by_user: true,
        shared_with_user: true,
        document: true,
      },
    });
  }

  async update(id: number, updateSharingDto: UpdateSharingDto, userId: number) {
    const existingSharing = await this.prisma.sharing.findUnique({
      where: { sharing_id: id },
    });
    if (!existingSharing) {
      throw new NotFoundException(`Sharing with id ${id} not found`);
    }

    const isOwner = existingSharing.shared_by_user_id === userId;

    if (isOwner) {
      return this.prisma.sharing.update({
        where: { sharing_id: id },
        data: updateSharingDto,
      });
    } else {
      throw new ForbiddenException(
        `User ${userId} is not authorized to update document ${id}`,
      );
    }
  }

  async remove(id: number, userId: number) {
    const existingSharing = await this.prisma.sharing.findUnique({
      where: { sharing_id: id },
    });
    if (!existingSharing) {
      throw new NotFoundException(`Sharing with id ${id} not found`);
    }

    const isOwner = existingSharing.shared_by_user_id === userId;

    if (isOwner) {
      return this.prisma.sharing.delete({
        where: { sharing_id: id },
      });
    } else {
      throw new ForbiddenException(
        `User ${userId} is not authorized to update document ${id}`,
      );
    }
  }
}
