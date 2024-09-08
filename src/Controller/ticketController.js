const Ticket = require('../../dao/models/tickets.js');

// Crear un nuevo ticket
exports.createTicket = async (req, res) => {
    try {
        const { amount, purchaser } = req.body;
        const newTicket = new Ticket({ amount, purchaser });

        await newTicket.save();

        res.status(201).json(newTicket);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el ticket', error });
    }
};

// Obtener un ticket por código
exports.getTicketByCode = async (req, res) => {
    try {
        const { code } = req.params;
        const ticket = await Ticket.findOne({ code });

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket no encontrado' });
        }

        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el ticket', error });
    }
};
