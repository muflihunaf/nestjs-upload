import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) {}

  create(createDocumentDto: CreateDocumentDto) {
    return this.prisma.document.create({ data: createDocumentDto });
  }

  async findAll(by, limit) {
    const orderBy: Prisma.DocumentOrderByWithRelationInput[] = [
      {
        title: by,
      },
    ];
    // const limit
    const document = await this.prisma.document.findMany({
      orderBy,
      include: {
        shared_with: true,
      },
      skip: limit,
    });
    return document;
    // document = document.()
  }

  findOne(id: number) {
    return this.prisma.document.findUnique({
      where: { document_id: id },
      include: {
        shared_with: true,
      },
    });
  }

  update(id: number, updateDocumentDto: UpdateDocumentDto) {
    return this.prisma.document.update({
      where: { document_id: id },
      data: updateDocumentDto,
    });
  }

  remove(id: number) {
    return this.prisma.document.delete({ where: { document_id: id } });
  }
}
