import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUrlShortcutDto } from './dto/create-url-shortcut.dto';
import { UpdateUrlShortcutDto } from './dto/update-url-shortcut.dto';
import { UrlShortcut } from './entities/url-shortcut.entity';
import { generateKey } from './generateKey';

@Injectable()
export class UrlShortcutsService {
  constructor(
    @InjectRepository(UrlShortcut)
    private repository: Repository<UrlShortcut>,
  ) {}

  async create(createUrlShortcutDto: CreateUrlShortcutDto): Promise<UrlShortcut> {
    // return 'This action adds a new urlShortcut';
    const uniqueID = generateKey();
    return await this.repository.save({
      ...createUrlShortcutDto,
      uniqueID,
      shortURL: `http://test.docker.localhost/api/sc/${uniqueID}`,
    });
  }

  async findAll(): Promise<UrlShortcut[]> {
    // return `This action returns all urlShortcuts`;
    return await this.repository.find();
  }

  async findOne(id: number): Promise<UrlShortcut> {
    // return `This action returns a #${id} urlShortcut`;
    return await this.repository.findOne({ id });
  }

  async update(id: number, updateUrlShortcutDto: UpdateUrlShortcutDto): Promise<UpdateResult> {
    // return `This action updates a #${id} urlShortcut`;
    return await this.repository.update({ id }, updateUrlShortcutDto);
  }

  async remove(id: number): Promise<void> {
    // return `This action removes a #${id} urlShortcut`;
    await this.repository.delete({ id });
    return;
  }

  async removeMultipleUid(uids: string[]): Promise<void> {
    // return `This action removes a #${id} urlShortcut`;
    for (const uid of uids) {
      await this.repository.delete({ uuid: uid });
    }
    return;
  }

  async findOneByUniqueID(uniqueID: string): Promise<any> {
    // return `This action returns a #${uniqueID} urlShortcut`;
    return await this.repository.findOne({ uniqueID });
  }
}
