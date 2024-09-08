const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../dao/models/User.js'); /* Ruta al modelo de usuario */
const { JWT_SECRET } = process.env; /* Asegurar de tener la clave secreta en las variables de entorno */

/* Estrategia para verificar el token JWT */
const jwtStrategy = new Strategy({
    jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(), 
        extractJwtFromCookie
    ]),
    secretOrKey: JWT_SECRET,
}, async (jwt_payload, done) => {
    try {
        const user = await User.findById(jwt_payload.id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Usuario no encontrado' });
        }
    } catch (err) {
        return done(err, false);
    }
});

function extractJwtFromCookie(req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['auth_token'];
    }
    return token;
}

module.exports = passport => {
    passport.use('jwt', jwtStrategy);
};
