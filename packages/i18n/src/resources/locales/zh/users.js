/**
 * 用户模块的中文翻译
 */

export const users = {
  title: '用户',
  subtitle: '用户管理',
  roles: {
    admin: '管理员',
    manager: '经理',
    user: '用户',
    guest: '访客'
  },
  status: {
    active: '活跃',
    inactive: '非活跃',
    pending: '待处理',
    blocked: '已封禁'
  },
  table: {
    columns: {
      name: '姓名',
      email: '邮箱',
      role: '角色',
      status: '状态',
      lastLogin: '最后登录',
      actions: '操作'
    }
  },
  actions: {
    add: '添加用户',
    edit: '编辑用户',
    delete: '删除用户',
    view: '查看详情',
    invite: '邀请用户',
    export: '导出用户',
    import: '导入用户',
    filter: '筛选用户',
    search: '搜索用户',
    resetPassword: '重置密码'
  },
  form: {
    firstName: '名',
    lastName: '姓',
    email: '邮箱',
    password: '密码',
    confirmPassword: '确认密码',
    role: '角色',
    status: '状态',
    department: '部门',
    position: '职位',
    phoneNumber: '电话号码',
    address: '地址',
    notes: '备注'
  },
  validation: {
    required: '此字段为必填项',
    invalidEmail: '无效的邮箱地址',
    passwordMismatch: '两次输入的密码不一致',
    passwordRequirements: '密码必须至少8个字符，包含大写字母、小写字母和数字',
    uniqueEmail: '该邮箱已被注册'
  },
  messages: {
    createSuccess: '用户创建成功',
    updateSuccess: '用户更新成功',
    deleteSuccess: '用户删除成功',
    inviteSuccess: '邀请发送成功',
    resetPasswordSuccess: '密码重置成功',
    confirmDelete: '确定要删除此用户吗？此操作无法撤销。'
  },
  filters: {
    all: '全部',
    byRole: '按角色',
    byStatus: '按状态',
    byDepartment: '按部门',
    dateRange: '日期范围'
  },
  permissions: {
    title: '权限',
    read: '读取',
    write: '写入',
    delete: '删除',
    manage: '管理'
  }
};

export default users;