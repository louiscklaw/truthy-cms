import { PartialType } from '@nestjs/swagger';
import { CreateMenyServiceTypeDto } from './create-meny_service_type.dto';

export class UpdateMenyServiceTypeDto extends PartialType(CreateMenyServiceTypeDto) {}
