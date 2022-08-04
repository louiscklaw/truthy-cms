import { Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { UserEntity } from 'src/auth/entity/user.entity';
import { UserStatusEnum } from 'src/auth/user-status.enum';
import { RoleEntity } from 'src/role/entities/role.entity';
import { RestaurantEntity } from 'src/restaurants/entities/restaurant.entity';

// import { faker } from '@faker-js/faker';
// import { UserTypeEnum } from 'src/auth/user-type.enum';

const { faker: faker_zh_tw } = require('@faker-js/faker/locale/zh_TW');
// const { faker: faker_zh_cn } = require('@faker-js/faker/locale/zh_CN');
// const { faker: faker_en_us } = require('@faker-js/faker/locale/en_US');
const { faker: faker_ja } = require('@faker-js/faker/locale/ja');

export default class CreateUserSeed {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(RestaurantEntity)
      .values(
        Array(3000)
          .fill(0)
          .map((a, i) => {
            return {
              name: `${faker_ja.company.bs()} ${i}`,
              email: faker_ja.internet.email(),
              country: faker_ja.address.country(),
              state: 'state test',
              address: faker_ja.address.streetAddress(),
              address1: faker_ja.address.streetAddress(),
              address2: faker_ja.address.streetAddress(),
              phone: faker_ja.phone.number(),
              location: faker_ja.address.city(),
              spent: 0,
              orders: 0,
              isActive: true,
            };
          }),
      )
      .orIgnore()
      .execute();
  }
}
