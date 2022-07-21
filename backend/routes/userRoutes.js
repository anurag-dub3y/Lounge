const express = require('express');
const router = express.Router()
const { createUser, loginUser, logoutUser, getUserDetails, forgotPassword, resetPassword, deleteUser } = require('../controller/userControls')
const { isAuthenticatedUser } = require("../middleware/auth");


router.route("/signUp").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/account/:id").get(isAuthenticatedUser, getUserDetails);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/update").put(isAuthenticatedUser, resetPassword);
router.route("/account/:id/delete").put(isAuthenticatedUser, deleteUser);



module.exports=router;
