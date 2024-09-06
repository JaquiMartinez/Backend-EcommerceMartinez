// dao/UserDao.js
const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const UserDTO = require('../dtos/UserDTO');

class UserDao {
    async createUser(data) {
        try {
            const hashedPassword = bcrypt.hashSync(data.password, 10);
            const newUser = new UserModel({
                ...data,
                password: hashedPassword
            });
            await newUser.save();
            return new UserDTO(newUser); // Retorna el DTO
        } catch (error) {
            throw new Error('Error al crear el usuario');
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await UserModel.findOne({ email });
            if (!user) {
                return null;
            }
            return new UserDTO(user); // Retorna el DTO
        } catch (error) {
            throw new Error('Error al obtener el usuario');
        }
    }
}

module.exports = UserDao;
