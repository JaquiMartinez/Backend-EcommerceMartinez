const UserDao = require('../dao/UserDAO.js');

class UserRepository {
    constructor() {
        this.userDao = new UserDao();
    }

    async createUser(data) {
        return await this.userDao.createUser(data);
    }

    async getUserByEmail(email) {
        return await this.userDao.getUserByEmail(email);
    }
}

module.exports = UserRepository;
