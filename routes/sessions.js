const express = require('express');
const passport = require('passport');
const UserDto = require('../dao/dtos/UserDTO.js');  // Importar el DTO
const router = express.Router();

// Middleware para proteger las rutas
const requireAuth = passport.authenticate('jwt', { session: false });

// Middleware de autorización para verificar que solo los usuarios logueados puedan acceder
function currentMiddleware(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ error: 'No autorizado' });
    }
    next();
}

// Ruta para obtener el usuario actual
router.get('/current', requireAuth, currentMiddleware, (req, res) => {
    const userDto = new UserDto(req.user);  // Usar el DTO para filtrar información sensible
    res.json(userDto);  // Enviar solo la información filtrada
});

module.exports = router;
