import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await AppDataSource.getRepository(User).findOne({
      where: { username },
      relations: ['roles', 'roles.permissions']
    });

    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({ message: '用户名或密码错误' });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '8h' }
    );

    // 获取用户权限路由
    const routes = user.roles.flatMap(role =>
      role.permissions
        .filter(p => p.frontRoutePath)
        .map(p => ({
          path: p.frontRoutePath,
          component: p.componentPath,
          name: p.menuName,
          icon: p.menuIcon,
          showInMenu: p.showInMenu
        }))
    );

    // 去重
    const uniqueRoutes = Array.from(new Set(routes.map(r => r.path)))
      .map(path => routes.find(r => r.path === path));
    res.status(200).json({
      code:200,
      message: '登录成功',
      data: {
        token: token,
        userInfo: {
          id: user.id,
          username: user.username,
          name: user.name,
          roles: user.roles.map(role => role.name)
        },
        permissions: user.roles.flatMap(role =>
          role.permissions.map(p => p.name)
        ),
        routes: uniqueRoutes
      }
    });
  } catch (err) {
    res.status(500).json({ message: '登录失败' });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: '未认证' });
  }
  res.json({
    userInfo: {
      id: req.user.id,
      username: req.user.username,
      name: req.user.name
    },
    routes: req.user.roles.flatMap(role =>
      role.permissions
        .filter(p => p.frontRoutePath)
        .map(p => ({
          path: p.frontRoutePath,
          component: p.componentPath,
          name: p.menuName,
          icon: p.menuIcon,
          showInMenu: p.showInMenu
        }))
    )
  });
};
