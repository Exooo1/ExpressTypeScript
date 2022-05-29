export const sessionConfig = {
    secret: 'password',
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 1000 * 60
    }
}