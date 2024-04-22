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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SharingEntity } from './entities/sharing.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('sharing')
@ApiTags('sharing')
export class SharingController {
  constructor(private readonly sharingService: SharingService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'save A shared document' })
  async create(@Req() req, @Body() createSharingDto: CreateSharingDto) {
    createSharingDto.shared_by_user_id = req.user.user_id;
    return await this.sharingService.create(createSharingDto);
    // return sharings.map((sharing) => new SharingEntity(sharing));
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get All shared document' })
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
  @ApiOperation({ summary: 'Get A shared document' })
  update(
    @Param('id') id: string,
    @Body() updateSharingDto: UpdateSharingDto,
    @Req() req,
  ) {
    return this.sharingService.update(+id, updateSharingDto, +req.user.user_id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete access shared document' })
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.sharingService.remove(+id, +req.user.user_id);
  }
}
