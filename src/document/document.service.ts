import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class DocumentService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  create(createDocumentDto: CreateDocumentDto) {
    return this.prisma.document.create({ data: createDocumentDto });
  }

  async findAll(by, limit, skip, userId) {
    const orderBy: Prisma.DocumentOrderByWithRelationInput[] = [
      {
        title: by,
      },
    ];
    const document = await this.prisma.document.findMany({
      where: {
        OR: [
          { user_id: userId },
          { shared_with: { some: { shared_with_user_id: userId } } },
        ],
      },
      orderBy,
      include: {
        shared_with: true,
      },
      take: limit,
      skip: skip,
    });

    return document;
  }

  async findOne(id: number, userId: number) {
    const result = await this.prisma.document.findUnique({
      where: { document_id: id },
      include: {
        user: true,
        shared_with: {
          include: {
            shared_with_user: true,
          },
        },
      },
    });

    if (!result) {
      throw new NotFoundException(`Document with id ${id} not found`);
    }

    const isOwner = result.user_id === userId;
    const isSharedWithUser = result.shared_with.some(
      (user) => user.shared_with_user_id === userId,
    );

    if (isOwner || isSharedWithUser) {
      return result;
    } else {
      throw new NotFoundException(
        `User ${userId} is not authorized to access document ${result.title}`,
      );
    }
  }

  async update(
    id: number,
    updateDocumentDto: UpdateDocumentDto,
    userId: number,
  ) {
    const existingDocument = await this.prisma.document.findUnique({
      where: { document_id: id },
      include: {
        shared_with: {
          include: {
            shared_with_user: true,
          },
        },
      },
    });
    if (!existingDocument) {
      throw new NotFoundException(`Document with id ${id} not found`);
    }

    const isOwner = existingDocument.user_id === userId;

    const isSharedWithUser = existingDocument.shared_with.some(
      (user) =>
        user.shared_with_user_id === userId &&
        user.permission_level === 'Write',
    );

    if (isSharedWithUser || isOwner) {
      return this.prisma.document.update({
        where: { document_id: id },
        data: updateDocumentDto,
      });
    } else {
      throw new ForbiddenException(
        `User ${userId} is not authorized to update document ${id}`,
      );
    }
  }

  async remove(id: number, userId: number) {
    const existingDocument = await this.prisma.document.findUnique({
      where: { document_id: id },
      include: {
        shared_with: {
          include: {
            shared_with_user: true,
          },
        },
      },
    });
    if (!existingDocument) {
      throw new NotFoundException(`Document with id ${id} not found`);
    }

    if (existingDocument.user_id !== userId) {
      throw new ForbiddenException(
        `User ${userId} is not authorized to update document ${id}`,
      );
    }

    const isSharedWithUser = existingDocument.shared_with.some(
      (user) =>
        user.shared_with_user_id === userId &&
        user.permission_level === 'Write',
    );

    const isOwner = existingDocument.user_id === userId;

    if (isSharedWithUser || isOwner) {
      await this.cloudinaryService.deleteFile(existingDocument.file_path);
      return this.prisma.document.delete({ where: { document_id: id } });
    } else {
      throw new ForbiddenException(
        `User ${userId} is not authorized to update document ${id}`,
      );
    }
  }
}
