const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

    // For some unknown reason, req.cookies is undefined
    var token = req.headers.cookie;
    
    if (!token || typeof token==='undefined') {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }
    
    // At this point, token starts with "token=...." the ... is the token we need
    token = token.slice(6);
    //   console.log(token);

    // This part connects with the userModel
    const decodedData = jwt.verify(token, process.env.JWT_KEY);

    req.user = await User.findById(decodedData.id);

    next();
});

