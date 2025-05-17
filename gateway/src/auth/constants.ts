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
    { path: '/api/auth/user/signUp', method: 'POST' }
];

export const PRIVATE_ROUTES = [
    { path: '/api/event', method: 'GET', Role: [Role.USER, Role.OPERATOR, Role.AUDITOR]},
    { path: '/api/event', method: 'POST', Role: [Role.AUDITOR]},
    { path: '/api/event/:event_id', method: 'GET', Role: [Role.USER, Role.OPERATOR, Role.AUDITOR]},
];
