import { PartialType } from '@nestjs/swagger';
import { CreateUrlShortcutDto } from './create-url-shortcut.dto';

export class UpdateUrlShortcutDto extends PartialType(CreateUrlShortcutDto) {}
