const express = require("express");
const router = express.Router();
const controller = require("./../controllers/user.controller");
router.get("/register",controller.register);
router.post('/register',controller.postRegister);

router.get("/login",controller.login);
router.post('/postLogin',controller.postLogin);

module.exports = router;