import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from './Role';

@Entity()
export class Permission {
  /** 权限ID，自增主键 */
  @PrimaryGeneratedColumn()
  id!: number;

  /** 权限名称，唯一标识 */
  @Column({ unique: true })
  name!: string;

  /** 权限描述，可选 */
  @Column({ nullable: true })
  description?: string;

  /** 权限对应的资源 */
  @Column()
  resource!: string;

  /** 权限对应的操作 */
  @Column()
  action!: string;

  /** 前端路由路径 */
  @Column({ nullable: true })
  apiRoutePath?: string;

  /** 前端访问的路由地址 */
  @Column({ nullable: true })
  frontRoutePath?: string;

  /** 路由组件路径 */
  @Column({ nullable: true })
  componentPath?: string;

  /** 菜单显示名称 */
  @Column({ nullable: true })
  menuName?: string;

  /** 菜单图标 */
  @Column({ nullable: true })
  menuIcon?: string;

  /** 是否显示在菜单 */
  @Column({ default: true })
  showInMenu!: boolean;

  /** 拥有该权限的角色列表 */
  @ManyToMany(() => Role, role => role.permissions)
  roles!: Role[];
}
