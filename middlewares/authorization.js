const jwt = require('jsonwebtoken');

const requireAuth = (roles, action = null) => (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: 'No se ha proporcionado un token' });
        }

        // Verifica y decodifica el token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                // Diferencia entre los diferentes tipos de errores JWT
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: 'El token ha expirado, por favor, inicie sesión nuevamente' });
                } else if (err.name === 'JsonWebTokenError') {
                    return res.status(401).json({ message: 'Token inválido, no autorizado' });
                } else {
                    return res.status(401).json({ message: 'Error de autenticación' });
                }
            }

            // Asegurar de que el decoded tiene los campos necesarios
            req.user = decoded;

            // Verifica el rol
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'No autorizado' });
            }

            // Verifica acciones específicas (como agregar a carrito solo para usuarios)
            if (action === 'add_to_cart' && req.user.role !== 'user') {
                return res.status(403).json({ message: 'Solo los usuarios pueden agregar productos al carrito' });
            }

            next();
        });

    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = requireAuth;