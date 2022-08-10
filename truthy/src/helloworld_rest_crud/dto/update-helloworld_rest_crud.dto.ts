import { PartialType } from '@nestjs/swagger';
import { CreateHelloworldRestCrudDto } from './create-helloworld_rest_crud.dto';

export class UpdateHelloworldRestCrudDto extends PartialType(CreateHelloworldRestCrudDto) {}
