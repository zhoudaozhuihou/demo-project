/**
 * 中文用户管理模块翻译
 */
export default {
  title: '用户管理',
  userList: '用户列表',
  addUser: '添加用户',
  editUser: '编辑用户',
  deleteUser: '删除用户',
  userDetails: '用户详情',
  search: '搜索用户...',
  roles: {
    admin: '管理员',
    user: '用户',
    manager: '经理',
    viewer: '查看者',
    editor: '编辑者'
  },
  status: {
    active: '活跃',
    inactive: '不活跃',
    pending: '待处理',
    suspended: '已暂停',
    deleted: '已删除'
  },
  table: {
    id: '编号',
    name: '姓名',
    email: '邮箱',
    role: '角色',
    status: '状态',
    lastLogin: '最后登录',
    createdAt: '创建时间',
    actions: '操作'
  },
  form: {
    firstName: '名',
    lastName: '姓',
    email: '邮箱',
    password: '密码',
    confirmPassword: '确认密码',
    role: '角色',
    status: '状态',
    sendInvitation: '发送邀请邮件',
    requiredField: '此字段为必填项',
    invalidEmail: '请输入有效的邮箱地址'
  },
  messages: {
    userAdded: '用户添加成功',
    userUpdated: '用户更新成功',
    userDeleted: '用户删除成功',
    confirmDelete: '确定要删除此用户吗？',
    passwordReset: '密码重置链接已发送给用户',
    invitationSent: '邀请发送成功'
  }
}; 