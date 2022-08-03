import { Module } from '@nestjs/common';
import { HelloworldService } from './helloworld.service';
import { HelloworldController } from './helloworld.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelloworldEntity } from './entities/helloworld.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HelloworldEntity])],

  controllers: [HelloworldController],
  providers: [HelloworldService],
})
export class HelloworldModule {}
