"use strict";

const ctrl = require("./home.ctrl")

const express = require("express");
const router = express.Router( );

router.get("/",ctrl.output.hello);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);
router.post("/login", ctrl.process.login);

module.exports = router;