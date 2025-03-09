import { Controller, Get, Post, Param, Inject, NotFoundException, UseInterceptors, UploadedFile, ParseFilePipe, ParseUUIDPipe, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  @Inject() files: FilesService;

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createFile(
    @UploadedFile(ParseFilePipe) file: Express.Multer.File,
  ) {
    return this.files.create(file);
  }

  @Get('/:id')
  async getFileById(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const file = await this.files.get(id);
    if(!file) throw new NotFoundException();

    const stream = await this.files.getObject(file.hash);
    res.set('Content-Type', file.mimeType);
    stream.pipe(res);
  }
}
