export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'jwt_secret',
};

export enum Role {
  USER = 'USER',
  OPERATOR = 'OPERATOR',
  AUDITOR = 'AUDITOR',
  ADMIN = 'ADMIN',
}

export const PUBLIC_ROUTES = [
  { path: '/api/auth/user/signIn', method: 'POST' },
  { path: '/api/auth/user/signUp', method: 'POST' },
];

export const PRIVATE_ROUTES = [
  { path: '/api/auth/user/admin/signUp', method: 'POST', Role: [Role.ADMIN] },
  { path: '/api/auth/user/list', method: 'GET', Role: [Role.ADMIN] },
  { path: '/api/auth/user/role', method: 'PUT', Role: [Role.ADMIN] },
  {
    path: '/api/event',
    method: 'GET',
    Role: [Role.OPERATOR],
  },
  { path: '/api/event', method: 'POST', Role: [Role.OPERATOR] },
  {
    path: '/api/event/detail/:event_id',
    method: 'GET',
    Role: [Role.OPERATOR],
  },
  {
    path: '/api/event/detail/:event_id',
    method: 'PUT',
    Role: [Role.OPERATOR],
  },
  {
    path: '/api/event/reward/:event_id',
    method: 'POST',
    Role: [Role.OPERATOR],
  },

  {
    path: '/api/event/reward/:event_id',
    method: 'GET',
    Role: [Role.OPERATOR],
  },
  { path: '/api/event/request/:event_id', method: 'POST', Role: [Role.USER] },
  {
    path: '/api/event/request',
    method: 'GET',
    Role: [Role.USER, Role.AUDITOR, Role.OPERATOR, Role.ADMIN],
  },
];
