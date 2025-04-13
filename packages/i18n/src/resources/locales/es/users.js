/**
 * Spanish translations for users module
 */

export const users = {
  title: 'Usuarios',
  subtitle: 'Gestión de usuarios',
  roles: {
    admin: 'Administrador',
    manager: 'Gerente',
    user: 'Usuario',
    guest: 'Invitado'
  },
  status: {
    active: 'Activo',
    inactive: 'Inactivo',
    pending: 'Pendiente',
    blocked: 'Bloqueado'
  },
  table: {
    columns: {
      name: 'Nombre',
      email: 'Correo electrónico',
      role: 'Rol',
      status: 'Estado',
      lastLogin: 'Último acceso',
      actions: 'Acciones'
    }
  },
  actions: {
    add: 'Añadir usuario',
    edit: 'Editar usuario',
    delete: 'Eliminar usuario',
    view: 'Ver detalles',
    invite: 'Invitar usuario',
    export: 'Exportar usuarios',
    import: 'Importar usuarios',
    filter: 'Filtrar usuarios',
    search: 'Buscar usuarios',
    resetPassword: 'Restablecer contraseña'
  },
  form: {
    firstName: 'Nombre',
    lastName: 'Apellido',
    email: 'Correo electrónico',
    password: 'Contraseña',
    confirmPassword: 'Confirmar contraseña',
    role: 'Rol',
    status: 'Estado',
    department: 'Departamento',
    position: 'Cargo',
    phoneNumber: 'Número de teléfono',
    address: 'Dirección',
    notes: 'Notas'
  },
  validation: {
    required: 'Este campo es obligatorio',
    invalidEmail: 'Correo electrónico no válido',
    passwordMismatch: 'Las contraseñas no coinciden',
    passwordRequirements: 'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula y un número',
    uniqueEmail: 'Este correo electrónico ya está registrado'
  },
  messages: {
    createSuccess: 'Usuario creado con éxito',
    updateSuccess: 'Usuario actualizado con éxito',
    deleteSuccess: 'Usuario eliminado con éxito',
    inviteSuccess: 'Invitación enviada con éxito',
    resetPasswordSuccess: 'Contraseña restablecida con éxito',
    confirmDelete: '¿Está seguro de que desea eliminar a este usuario? Esta acción no se puede deshacer.'
  },
  filters: {
    all: 'Todos',
    byRole: 'Por rol',
    byStatus: 'Por estado',
    byDepartment: 'Por departamento',
    dateRange: 'Rango de fechas'
  },
  permissions: {
    title: 'Permisos',
    read: 'Leer',
    write: 'Escribir',
    delete: 'Eliminar',
    manage: 'Gestionar'
  }
};

export default users; 