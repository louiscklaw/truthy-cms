import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';
import { HelloworldRestCrudModule } from './helloworld_rest_crud/helloworld_rest_crud.module';

const PG_HOST = process.env.HOST_ADDRESS || 'localhost';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    TagsModule,
    HelloworldRestCrudModule,
  ],
})
export class AppModule {}
