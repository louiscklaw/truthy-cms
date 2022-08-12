import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UrlShortcutsService } from './url-shortcuts.service';
import { CreateUrlShortcutDto } from './dto/create-url-shortcut.dto';
import { UpdateUrlShortcutDto } from './dto/update-url-shortcut.dto';
import * as express from 'express';

import { UrlShortcut } from './entities/url-shortcut.entity';

@Controller('url-shortcuts')
export class UrlShortcutsController {
  constructor(private readonly urlShortcutsService: UrlShortcutsService) {}

  @Get('/helloworld')
  helloworld() {
    return { hello: `url-shortcuts world` };
  }

  @Post()
  create(@Body() createUrlShortcutDto: CreateUrlShortcutDto) {
    return this.urlShortcutsService.create(createUrlShortcutDto);
  }

  @Get()
  findAll() {
    return this.urlShortcutsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.urlShortcutsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUrlShortcutDto: UpdateUrlShortcutDto) {
    return this.urlShortcutsService.update(+id, updateUrlShortcutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.urlShortcutsService.remove(+id);
  }

  @Post('uid/delete-multiple')
  uidDeleteMultiple(@Body() uids: string[]) {
    return this.urlShortcutsService.removeMultipleUid(uids);
  }
}

// extract url
@Controller('sc')
export class UrlShortcutsExtractController {
  constructor(private readonly urlShortcutsService: UrlShortcutsService) {}

  // GET http://{{API_HOST}}/api/sc/helloworld
  @Get('/helloworld')
  helloworld() {
    return { hello: `UrlShortcutsExtractController world` };
  }

  // http://test.docker.localhost/sc/545f72d4
  @Get(':uniqueID')
  async findOne(@Param('uniqueID') uniqueID: string, @Res() res): Promise<void> {
    const result = await this.urlShortcutsService.findOneByUniqueID(uniqueID);
    if (result) {
      res.redirect('http://www.google.com');
    }
  }
}
