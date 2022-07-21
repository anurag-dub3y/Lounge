module.exports = (theFunc) => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
};

// Promise is a javascript class. It allows you to associate handlers with an asynchronous action's eventual success value or failure reason.

// The catch() method returns a Promise and deals with rejected cases only. 
