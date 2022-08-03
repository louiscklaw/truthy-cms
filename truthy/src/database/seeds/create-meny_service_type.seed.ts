import { Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { UserEntity } from 'src/auth/entity/user.entity';
import { UserStatusEnum } from 'src/auth/user-status.enum';
import { RoleEntity } from 'src/role/entities/role.entity';
import { MenyServiceTypeEntity } from 'src/meny_service_type/entities/meny_service_type.entity';

// import { faker } from '@faker-js/faker';
// import { UserTypeEnum } from 'src/auth/user-type.enum';

// const { faker: faker_zh_tw } = require('@faker-js/faker/locale/zh_TW');
// const { faker: faker_zh_cn } = require('@faker-js/faker/locale/zh_CN');
// const { faker: faker_en_us } = require('@faker-js/faker/locale/en_US');
// const { faker: faker_ja } = require('@faker-js/faker/locale/ja');

export default class CreateMenyServiceTypeSeed {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(MenyServiceTypeEntity)
      .values([
        {
          name: 'meny',
          description: 'test meny service',
          canEditMenu: true,
          canEditRestaurant: false,
          canProcessStayOrder: true,
          canProcessTakeAwayOrder: false,
        },
        {
          name: 'meny-carry-out',
          description: 'test meny-carry-out service',
          canEditMenu: true,
          canEditRestaurant: false,
          canProcessStayOrder: false,
          canProcessTakeAwayOrder: true,
        },
        {
          name: 'meny-light',
          description: 'test meny-light service',
          canEditMenu: true,
          canEditRestaurant: false,
          canProcessStayOrder: true,
          canProcessTakeAwayOrder: false,
        },
      ])
      .orIgnore()
      .execute();
  }
}
