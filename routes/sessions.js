const express = require('express');
const passport = require('passport');
const router = express.Router();

// Middleware para proteger las rutas
const requireAuth = passport.authenticate('jwt', { session: false });

/* Ruta para obtener el usuario actual */
router.get('/current', requireAuth, (req, res) => {
    res.json(req.user);
});

module.exports = router;