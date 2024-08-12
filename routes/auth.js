const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../dao/models/User');
const passport = require('passport');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, age, password, cart } = req.body;
        const newUser = new User({ first_name, last_name, email, age, password, cart });
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(400).json({ error: 'Mail en uso' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
        return res.status(401).json({ message: 'Mail o contraseña inválido' });
    }

    const token = jwt.sign({ id: user._id }, 'your_jwt_secret_key', { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;