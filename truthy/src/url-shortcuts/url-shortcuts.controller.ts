import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UrlShortcutsService } from './url-shortcuts.service';
import { CreateUrlShortcutDto } from './dto/create-url-shortcut.dto';
import { UpdateUrlShortcutDto } from './dto/update-url-shortcut.dto';

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
}
