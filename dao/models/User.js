const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
    role: { type: String, default: 'user' }
});

/* Middleware para encriptar la contraseña antes de guardarla */
userSchema.pre('guardar', function (next) {
    if (this.isModified('contraseña') || this.isNew) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    next();
});

/* Método para comparar la contraseña ingresada con la almacenada */
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);