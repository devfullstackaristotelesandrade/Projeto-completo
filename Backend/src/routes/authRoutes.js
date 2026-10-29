const express = require("express");

const {
    register,
    login
} = require("../controllers/authController");

const validar = require("../middlewares/validationMiddleware");

const {
    registerSchema,
    loginSchema
} = require("../validators/authValidator");

const router = express.Router();

router.post(
    "/register",
    validar(registerSchema),
    register
);

router.post(
    "/login",
    validar(loginSchema),
    login
);

module.exports = router;