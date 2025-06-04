import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Role } from './Role';
import bcrypt from 'bcrypt';

@Entity()
export class User {
  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  async hashPassword(): Promise<void> {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  /** 用户ID，自增主键 */
  @PrimaryGeneratedColumn()
  id!: number;

  /** 用户名，唯一标识 */
  @Column({ unique: true })
  username!: string;

  /** 密码，存储加密后的值 */
  @Column()
  password!: string;

  /** 用户真实姓名 */
  @Column()
  name!: string;

  /** 用户头像URL，可选 */
  @Column({ nullable: true })
  avatar?: string;

  /** 账户是否激活，默认true */
  @Column({ default: true })
  isActive!: boolean;

  /** 关联的角色列表 */
  @ManyToMany(() => Role)
  @JoinTable()
  roles!: Role[];
}
