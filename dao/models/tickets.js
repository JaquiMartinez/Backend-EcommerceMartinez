const mongoose = require('mongoose');
const { Schema } = mongoose;

const ticketSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        default: () => Math.random().toString(36).substr(2, 9) //Genera un código único
    },
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;