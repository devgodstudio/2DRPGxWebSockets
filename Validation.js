const bcrypt = require("bcrypt");

class Validation{
    static validateInput(input){
        return input !== null || input !== "" || input !== Validation.validateCharacters(input);
    }

    //invalid characters
    static validateCharacters(input){
        return !!input.match(/^[a-zA-Z]+$/);
    }

    //is valid integer
    static validateInteger(input){
        return !!input.match(/^[0-9]+$/);
    }

    //is valid float
    static validateFloat(input){
        return !!input.match(/^[0-9]+\.[0-9]+$/);
    }

    //is valid password bcrypt
    static async validatePassword(submittedPassword, storedHash) {
        return bcrypt.compare(submittedPassword, storedHash); // Returns a promise that resolves to true or false
    }

    static hashPassword(password){
        return bcrypt.hash(password, 10); // Returns a promise
    }

    static JwtToken() {

        //generate a random string
        const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    }
}

//export the class
module.exports = {
    Validation
}