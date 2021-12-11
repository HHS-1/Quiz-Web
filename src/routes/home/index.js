"use strict";

const ctrl = require("./home.ctrl")

const express = require("express");
const router = express.Router( );

router.get("/",ctrl.hello);

router.get("/login", ctrl.login);

module.exports = router;