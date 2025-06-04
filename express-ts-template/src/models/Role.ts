import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from './User';
import { Permission } from './Permission';

@Entity()
export class Role {
  // 预定义角色常量
  static readonly BOSS = 'boss';
  static readonly MANAGER = 'manager';
  static readonly STAFF = 'staff';

  /** 角色ID，自增主键 */
  @PrimaryGeneratedColumn()
  id!: number;

  /** 角色名称，唯一标识 */
  @Column({ unique: true })
  name!: string;

  /** 角色描述，可选 */
  @Column({ nullable: true })
  description?: string;

  /** 拥有该角色的用户列表 */
  @ManyToMany(() => User, user => user.roles)
  users!: User[];

  /** 角色包含的权限列表 */
  @ManyToMany(() => Permission)
  @JoinTable()
  permissions!: Permission[];
}
