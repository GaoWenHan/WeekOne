import { Request, Response, NextFunction } from 'express';

const routeGuard = async (req: Request, res: Response, next: NextFunction) => {
  const path = req.path;
  const method = req.method;

  if (!req.user) {
    return res.status(401).json({ message: '请先登录' });
  }

  // 检查用户是否有该路由的访问权限
  const hasAccess = req.user.roles.some(role =>
    role.permissions.some(p => 
      p.routePath === path && 
      (p.action === method.toLowerCase() || p.action === '*')
    )
  );

  if (!hasAccess) {
    return res.status(403).json({ message: '无权访问该路由' });
  }
  next();
};

export default routeGuard;
