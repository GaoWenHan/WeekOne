import { AppDataSource } from './config/database';
import { User } from './models/User';
import { Role } from './models/Role';
import { Permission } from './models/Permission';

async function seedDatabase() {
  await AppDataSource.initialize();

  // 1. 创建权限
  const readPermission = new Permission();
  readPermission.name = 'read';
  readPermission.description = '查看权限';
  readPermission.resource = '*';
  readPermission.action = 'get';
  readPermission.apiRoutePath = '/api/*';
  readPermission.frontRoutePath = '*';
  readPermission.componentPath = '*';
  readPermission.menuName = '查看';
  readPermission.showInMenu = true;

  const writePermission = new Permission();
  writePermission.name = 'write';
  writePermission.description = '编辑权限';
  writePermission.resource = '*';
  writePermission.action = 'post,put';
  writePermission.apiRoutePath = '/api/*';
  writePermission.frontRoutePath = '*';
  writePermission.componentPath = '*';
  writePermission.menuName = '编辑';
  writePermission.showInMenu = true;

  const adminPermission = new Permission();
  adminPermission.name = 'admin';
  adminPermission.description = '管理员权限';
  adminPermission.resource = '*';
  adminPermission.action = '*';
  adminPermission.apiRoutePath = '/api/*';
  adminPermission.frontRoutePath = '*';
  adminPermission.componentPath = '*';
  adminPermission.menuName = '管理';
  adminPermission.showInMenu = true;

  const revenuePermission = new Permission();
  revenuePermission.name = 'view_revenue'; // 权限名最好统一小写、下划线
  revenuePermission.description = '查看流水统计';
  revenuePermission.resource = 'revenue';  // 可写模块名
  revenuePermission.action = 'get,post,put,delete';// 对应 HTTP 方法
  revenuePermission.apiRoutePath = '/api/revenue'; // 对应后端 API 路径
  revenuePermission.frontRoutePath = '/layout/revenue'; // 对应前端路由路径
  revenuePermission.componentPath = 'revenue'; // 对应前端组件路径
  revenuePermission.menuName = '收入统计'; // 菜单显示名称
  revenuePermission.showInMenu = true; // 是否显示在菜单

  await AppDataSource.manager.save([
    readPermission,
    writePermission,
    adminPermission,
    revenuePermission
  ]);

  // 2. 创建角色
  const userRole = new Role();
  userRole.name = 'user';
  userRole.description = '普通用户';
  userRole.permissions = [readPermission];

  const editorRole = new Role();
  editorRole.name = 'editor';
  editorRole.description = '编辑';
  editorRole.permissions = [readPermission, writePermission, revenuePermission];

  const adminRole = new Role();
  adminRole.name = 'admin';
  adminRole.description = '管理员';
  adminRole.permissions = [readPermission, writePermission, adminPermission, revenuePermission];

  await AppDataSource.manager.save([
    userRole,
    editorRole,
    adminRole
  ]);

  // 3. 创建测试用户
  const testUser = new User();
  testUser.username = 'testuser';
  testUser.password = 'user123';
  testUser.name = '测试用户';
  testUser.roles = [userRole];
  await testUser.hashPassword();

  const testEditor = new User();
  testEditor.username = 'testeditor';
  testEditor.password = 'editor123';
  testEditor.name = '测试编辑';
  testEditor.roles = [editorRole];
  await testEditor.hashPassword();

  const testAdmin = new User();
  testAdmin.username = 'testadmin';
  testAdmin.password = 'admin123';
  testAdmin.name = '测试管理员';
  testAdmin.roles = [adminRole];
  await testAdmin.hashPassword();

  await AppDataSource.manager.save([
    testUser,
    testEditor,
    testAdmin
  ]);

  console.log('测试数据创建完成！');
  console.log('普通用户: testuser/user123');
  console.log('编辑: testeditor/editor123');
  console.log('管理员: testadmin/admin123');
}

seedDatabase().catch(err => console.error(err));
