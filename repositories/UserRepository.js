const UserDao = require('../dao/UserDAO.js');

class UserRepository {
    constructor() {
        this.userDao = new UserDao();
    }

    async getUserById(id) {
        return await this.userDao.findById(id);
    }

    async getAllUsers() {
        return await this.userDao.findAll();
    }

    async createUser(user) {
        return await this.userDao.create(user);
    }

    async updateUser(id, userUpdates) {
        return await this.userDao.update(id, userUpdates);
    }

    async deleteUser(id) {
        return await this.userDao.delete(id);
    }
}

module.exports = UserRepository;
