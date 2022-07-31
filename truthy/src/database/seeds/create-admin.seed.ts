import { Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { UserEntity } from 'src/auth/entity/user.entity';
import { UserStatusEnum } from 'src/auth/user-status.enum';
import { RoleEntity } from 'src/role/entities/role.entity';

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
          username: 'admin',
          email: 'admin@truthy.com',
          password: password_hash,
          salt: password_salt,
          name: 'truthy',
          status: UserStatusEnum.ACTIVE,
          roleId: role_admin.id,
        },
      ])
      .orIgnore()
      .execute();
  }
}
