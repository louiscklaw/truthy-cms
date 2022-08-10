import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tag } from "src/tags/entities/tag.entity";
import { TagsController } from "src/tags/tags.controller";
import { TagsService } from "src/tags/tags.service";
import { User } from "./user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Tag])],
  providers: [UsersService, TagsService],
  controllers: [UsersController],
})
export class UsersModule {}
