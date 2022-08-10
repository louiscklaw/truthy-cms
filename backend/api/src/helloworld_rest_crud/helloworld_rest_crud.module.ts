import { Module } from '@nestjs/common';
import { HelloworldRestCrudService } from './helloworld_rest_crud.service';
import { HelloworldRestCrudController } from './helloworld_rest_crud.controller';
import { HelloworldRestCrud } from './entities/helloworld_rest_crud.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsService } from 'src/tags/tags.service';
import { Tag } from 'src/tags/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HelloworldRestCrud, Tag])],
  controllers: [HelloworldRestCrudController],
  providers: [HelloworldRestCrudService, TagsService],
})
export class HelloworldRestCrudModule {}
