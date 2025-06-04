import { Request, Response, NextFunction } from 'express';

export const checkPermission = (requiredPermission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: '未认证' });
    }

    const hasPermission = req.user.roles.some(role => 
      role.permissions.some(p => p.name === requiredPermission)
    );

    if (!hasPermission) {
      return res.status(403).json({ message: '无权访问' });
    }
    next();
  };
};
