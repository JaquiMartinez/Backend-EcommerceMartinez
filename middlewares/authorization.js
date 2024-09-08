const jwt = require('jsonwebtoken');

const requireAuth = (roles) => (req, res, next) => {
    try {
        // Obtener el token desde las cookies o el encabezado Authorization
        const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ message: 'No se ha proporcionado un token' });
        }

        // Verificar el token JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // Verificación del rol del usuario
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'No autorizado: rol insuficiente' });
        }

        // Continúa hacia el siguiente middleware/controlador
        next();
    } catch (error) {
        // Verificar si el error es por expiración del token o un error de firma
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'El token ha expirado' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Token inválido' });
        } else {
            return res.status(500).json({ message: 'Error en la autenticación' });
        }
    }
};

module.exports = requireAuth;
