import { Module } from '@nestjs/common';
import { UrlShortcutsService } from './url-shortcuts.service';
import { UrlShortcutsController } from './url-shortcuts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlShortcut } from './entities/url-shortcut.entity';
import { Tag } from 'src/tag/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UrlShortcut, Tag])],
  controllers: [UrlShortcutsController],
  providers: [UrlShortcutsService],
})
export class UrlShortcutsModule {}
