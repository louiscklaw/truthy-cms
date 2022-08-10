import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/tags/entities/tag.entity';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Tag)
    private readonly tagsRepositoty: Repository<Tag>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.tags = createUserDto.tags;

    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: { tags: true } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let update_content = { ...updateUserDto, id };
    console.log({ updateUserDto });
    return this.usersRepository.save(update_content);
  }

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOneBy({ id: id });
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOneBy({ username: username });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
