import { Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { UserEntity } from 'src/auth/entity/user.entity';
import { UserStatusEnum } from 'src/auth/user-status.enum';
import { RoleEntity } from 'src/role/entities/role.entity';

// import { faker } from '@faker-js/faker';
// import { UserTypeEnum } from 'src/auth/user-type.enum';

// const { faker: faker_zh_tw } = require('@faker-js/faker/locale/zh_TW');
// const { faker: faker_zh_cn } = require('@faker-js/faker/locale/zh_CN');
// const { faker: faker_en_us } = require('@faker-js/faker/locale/en_US');
// const { faker: faker_ja } = require('@faker-js/faker/locale/ja');

// Truthy@123
const password_hash = '$2b$10$O9BWip02GuE14bDPfBomQebCjwKQyuUfkulhvBB1UoizOeKxGG8Fu';
const password_salt = '$2b$10$O9BWip02GuE14bDPfBomQe';

export default class CreateUserSeed {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const role_admin = await connection
      .getRepository(RoleEntity)
      .createQueryBuilder('role')
      .where('role.name = :name', { name: 'superuser' })
      .getOne();

    if (!role_admin) return;

    await connection
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values([
        {
          username: 'user1',
          email: 'user1@truthy.com',
          phone: 'phone test',
          country: 'country test',
          state: 'state test',
          address: 'address test',
          address1: 'address1 test',
          address2: 'address2 test',
          password: password_hash,
          salt: password_salt,
          name: 'user1_truthy',
          status: UserStatusEnum.ACTIVE,
          contact_info_public: true,
          roleId: role_admin.id,
        },
      ])
      .orIgnore()
      .execute();
  }
}
