const express = require('express');
const router = express.Router();
const ticketController = require('../src/Controller/ticketController.js');

// Ruta para crear un ticket
router.post('/', ticketController.createTicket);

// Ruta para obtener un ticket por código
router.get('/:code', ticketController.getTicketByCode);

module.exports = router;