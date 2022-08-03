import { PartialType } from '@nestjs/swagger';
import { CreateHelloworldDto } from './create-helloworld.dto';

export class UpdateHelloworldDto extends PartialType(CreateHelloworldDto) {}
