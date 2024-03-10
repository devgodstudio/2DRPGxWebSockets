//This validation class will be used to validate the user input and the game logic
//The game logic will be handled in the gameManager class
class Validation{
//This function will validate the user input
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

}

//export the class
module.exports = Validation;