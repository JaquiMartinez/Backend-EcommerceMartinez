//middleware que verifica múltiples roles y también incluye la lógica para validar el token JWT
const jwt = require('jsonwebtoken');

const requireAuth = (roles) => (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: 'No se ha proporcionado un token' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // Verifica el rol
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'No autorizado' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = requireAuth;
