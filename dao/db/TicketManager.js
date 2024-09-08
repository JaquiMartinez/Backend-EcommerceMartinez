const Ticket = require('../../dao/models/tickets.js');

class TicketManager {
    // Crea un nuevo ticket con la información de la compra
    async createTicket(ticketData) {
        try {
            const newTicket = new Ticket(ticketData);
            await newTicket.save();
            return newTicket;
        } catch (error) {
            throw new Error('Error al crear el ticket');
        }
    }

    // Obtiene un ticket por su ID
    async getTicketById(id) {
        try {
            return await Ticket.findById(id);
        } catch (error) {
            throw new Error('Ticket no encontrado');
        }
    }

    // (Opcional) Puedes añadir más métodos aquí según las necesidades de tu aplicación
}

module.exports = TicketManager;