import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('document')
@ApiTags('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() createDocumentDto: CreateDocumentDto, @Req() req) {
    createDocumentDto.user_id = req.user.user_id;
    return this.documentService.create(createDocumentDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Req() req,
    @Query('OrderBy') orderBy: string,
    @Query('limit') limit: number,
    @Query('skip') skip: number,
  ) {
    const userId = req.user.user_id;
    const documents = await this.documentService.findAll(
      orderBy,
      +limit,
      +skip,
      +userId,
    );
    return documents;
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Req() req) {
    const userId = req.user.user_id;
    return this.documentService.findOne(+id, userId);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
    @Req() req,
  ) {
    return this.documentService.update(
      +id,
      updateDocumentDto,
      +req.user.user_id,
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Req() req) {
    return this.documentService.remove(+id, +req.user.user_id);
  }

  @Post('/upload')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  upload(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentService.create(createDocumentDto);
  }
}
