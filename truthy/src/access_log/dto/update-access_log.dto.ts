import { PartialType } from '@nestjs/swagger';
import { CreateAccessLogDto } from './create-access_log.dto';

export class UpdateAccessLogDto extends PartialType(CreateAccessLogDto) {}
