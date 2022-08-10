import { PartialType } from '@nestjs/mapped-types';
import { CreateHelloworldRestCrudDto } from './create-helloworld_rest_crud.dto';

export class UpdateHelloworldRestCrudDto extends PartialType(CreateHelloworldRestCrudDto) {}
