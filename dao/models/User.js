const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: false },
    password: { type: String, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
    role: { type: String, default: 'user' }
});

/* Middleware para encriptar la contraseña antes de guardarla */
userSchema.pre('save', function (next) {
    if (this.isModified('password') || this.isNew) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    next();
});

/* Método para comparar la contraseña ingresada con la almacenada */
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};

/* Método para encontrar usuario por correo */
userSchema.statics.findByEmail = function (email) {
    return this.findOne({ email });
};

/* Método para encontrar usuario por ID */
userSchema.statics.findById = function (id) {
    return this.findById(id);
};

module.exports = mongoose.model('User', userSchema);