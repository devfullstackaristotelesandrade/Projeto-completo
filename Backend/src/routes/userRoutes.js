const express = require("express");

const autenticar = require("../middlewares/authMiddleware");

const {
    me
} = require("../controllers/userController");

const router = express.Router();

router.get(
    "/me",
    autenticar,
    me
);

module.exports = router;