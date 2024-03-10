//This validation class will be used to validate the user input and the game logic
//The game logic will be handled in the gameManager class
class Validation{
//This function will validate the user input
    static validateInput(input){
        if(input !== null || input !== "" || input !== Validation.validateCharacters(input)) {
            return true;
        }
        else{
            return false;
        }
    }

    //invalid characters
    static validateCharacters(input){
        if(input.match(/^[a-zA-Z]+$/)){
            return true;
        }
        else{
            return false;
        }
    }

    //is valid integer
    static validateInteger(input){
        if(input.match(/^[0-9]+$/)){
            return true;
        }
        else{
            return false;
        }
    }

    //is valid float
    static validateFloat(input){
        if(input.match(/^[0-9]+\.[0-9]+$/)){
            return true;
        }
        else{
            return false;
        }
    }

}

//export the class
module.exports = Validation;