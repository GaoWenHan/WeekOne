import "reflect-metadata";
import { DataSource, MigrationInterface, QueryRunner } from "typeorm";
import { User } from "../models/User";
import { Role } from "../models/Role";
import { Permission } from "../models/Permission";

class InitRoles implements MigrationInterface {
  name = 'init-roles';
  
  async up(queryRunner: QueryRunner) {
    await queryRunner.manager.insert(Role, [
      { name: Role.BOSS, description: '系统最高权限管理者' },
      { name: Role.MANAGER, description: '餐厅店长' },
      { name: Role.STAFF, description: '普通店员' }
    ]);
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.manager.delete(Role, [
      { name: Role.BOSS },
      { name: Role.MANAGER },
      { name: Role.STAFF }
    ]);
  }
}

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "root",
  database: "camprestaurant_rbac",
  synchronize: true,
  logging: false,
  entities: [User, Role, Permission],
  migrations: [InitRoles],
  subscribers: [],
});
