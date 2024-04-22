import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { SharingService } from './sharing.service';
import { CreateSharingDto } from './dto/create-sharing.dto';
import { UpdateSharingDto } from './dto/update-sharing.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SharingEntity } from './entities/sharing.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('sharing')
@ApiTags('sharing')
export class SharingController {
  constructor(private readonly sharingService: SharingService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async create(@Req() req, @Body() createSharingDto: CreateSharingDto) {
    createSharingDto.shared_by_user_id = req.user.user_id;
    return await this.sharingService.create(createSharingDto);
    // return sharings.map((sharing) => new SharingEntity(sharing));
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() request) {
    const user = request.user;
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_GATEWAY);
    }
    const sharings = await this.sharingService.findAll(user.user_id);
    return sharings.map((sharing) => new SharingEntity(sharing));
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateSharingDto: UpdateSharingDto,
    @Req() req,
  ) {
    return this.sharingService.update(+id, updateSharingDto, +req.user.user_id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.sharingService.remove(+id, +req.user.user_id);
  }
}
