// TODO: store roles in database
export enum Role {
  user = 'user',
  staff = 'staff',
  driver = 'driver',
  owner = 'owner',
  organization = 'organization',
  support = 'support',
  admin = 'admin',
}

export enum Action {
  create = 'create',
  read = 'read',
  update = 'update',
  delete = 'delete',
  manage = 'manage', // for CASL means 'any'
}

export type Permission = string;

export const ROLES_KEY = 'roles';
export const PERMISSIONS_KEY = 'permissions';
