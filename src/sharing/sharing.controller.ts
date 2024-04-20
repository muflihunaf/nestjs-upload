import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SharingService } from './sharing.service';
import { CreateSharingDto } from './dto/create-sharing.dto';
import { UpdateSharingDto } from './dto/update-sharing.dto';
import { ApiTags } from '@nestjs/swagger';
import { SharingEntity } from './entities/sharing.entity';

@Controller('sharing')
@ApiTags('sharing')
export class SharingController {
  constructor(private readonly sharingService: SharingService) {}

  @Post()
  async create(@Body() createSharingDto: CreateSharingDto) {
    const sharings = await this.sharingService.create(createSharingDto);
    return sharings;
    // return sharings.map((sharing) => new SharingEntity(sharing));
  }

  @Get()
  async findAll() {
    const sharings = await this.sharingService.findAll();
    return sharings.map((sharing) => new SharingEntity(sharing));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sharingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSharingDto: UpdateSharingDto) {
    return this.sharingService.update(+id, updateSharingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sharingService.remove(+id);
  }
}
