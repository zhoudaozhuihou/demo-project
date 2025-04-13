/**
 * English translations for users module
 */

export const users = {
  title: 'Users',
  subtitle: 'User Management',
  roles: {
    admin: 'Administrator',
    manager: 'Manager',
    user: 'User',
    guest: 'Guest'
  },
  status: {
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
    blocked: 'Blocked'
  },
  table: {
    columns: {
      name: 'Name',
      email: 'Email',
      role: 'Role',
      status: 'Status',
      lastLogin: 'Last Login',
      actions: 'Actions'
    }
  },
  actions: {
    add: 'Add User',
    edit: 'Edit User',
    delete: 'Delete User',
    view: 'View Details',
    invite: 'Invite User',
    export: 'Export Users',
    import: 'Import Users',
    filter: 'Filter Users',
    search: 'Search Users',
    resetPassword: 'Reset Password'
  },
  form: {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    role: 'Role',
    status: 'Status',
    department: 'Department',
    position: 'Position',
    phoneNumber: 'Phone Number',
    address: 'Address',
    notes: 'Notes'
  },
  validation: {
    required: 'This field is required',
    invalidEmail: 'Invalid email address',
    passwordMismatch: 'Passwords do not match',
    passwordRequirements: 'Password must be at least 8 characters and include uppercase, lowercase, and numbers',
    uniqueEmail: 'This email is already registered'
  },
  messages: {
    createSuccess: 'User created successfully',
    updateSuccess: 'User updated successfully',
    deleteSuccess: 'User deleted successfully',
    inviteSuccess: 'Invitation sent successfully',
    resetPasswordSuccess: 'Password reset successfully',
    confirmDelete: 'Are you sure you want to delete this user? This action cannot be undone.'
  },
  filters: {
    all: 'All',
    byRole: 'By Role',
    byStatus: 'By Status',
    byDepartment: 'By Department',
    dateRange: 'Date Range'
  },
  permissions: {
    title: 'Permissions',
    read: 'Read',
    write: 'Write',
    delete: 'Delete',
    manage: 'Manage'
  }
};

export default users; 