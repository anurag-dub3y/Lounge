// ErrorHandler is the name of our class
// Error is the parent class
// The 'extends' word connects them, shows first is inherited from second

class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message); // super is the constructor of the Error class
        this.statusCode = statusCode

        Error.captureStackTrace(this,this.constructor);
        // Creates a .stack property on targetObject, which when accessed returns a string representing the location in the code at which Error.captureStackTrace() was called.
    }
    
}

module.exports = ErrorHandler;