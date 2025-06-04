import express from 'express';
import path from 'path';
import { AppDataSource } from './config/database';

const app = express();
const port = process.env.PORT || 3000;
// 初始化TypeORM并创建数据库
AppDataSource.initialize()
  .then(async () => {
    console.log('Database connected');
  })
  .catch(err => console.error('Database connection error', err))

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
});

// 路由守卫 - 保护所有API路由(排除登录接口)
import routeGuard from './middlewares/routeGuard';
app.use('/api', (req, res, next) => {
  if (req.path === '/auth/login') {
    return next();
  }
  routeGuard(req, res, next);
});

// Routes
app.use('/api/auth', require('./routes/auth').default);

// Serve static files
app.use(express.static(path.join(__dirname, '../dist')));

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
