class UserDto {
    constructor(user) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.role = user.role;
        // Incluye solo la información que se desea exponer
    }
}

module.exports = UserDto;
