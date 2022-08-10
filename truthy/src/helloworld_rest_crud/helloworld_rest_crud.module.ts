import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HelloworldRestCrudService } from './helloworld_rest_crud.service';
import { HelloworldRestCrudController } from './helloworld_rest_crud.controller';
import { HelloworldRestCrud } from './entities/helloworld_rest_crud.entity';

import { Tag } from 'src/tag/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HelloworldRestCrud, Tag])],
  controllers: [HelloworldRestCrudController],
  providers: [HelloworldRestCrudService],
})
export class HelloworldRestCrudModule {}
