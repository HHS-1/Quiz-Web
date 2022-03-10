"use strict";

const ctrl = require("./home.ctrl")

const express = require("express");
const router = express.Router( );

router.get("/",ctrl.output.hello);
router.get("/login", ctrl.output.login);
router.get("/logout", ctrl.output.logout);
router.get("/register0", ctrl.output.register0);
router.get("/register", ctrl.output.register);
router.get("/register2", ctrl.output.register2);
router.get("/board", ctrl.output.board);
router.get("/writing", ctrl.output.writing);
router.get("/findingid",ctrl.output.findingid);
router.get("/findingpw",ctrl.output.findingpw);
// router.get("/p", ctrl.output.phone);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);
router.post("/register2", ctrl.process.email);
router.post("/board", ctrl.process.board);
router.post("/writing",ctrl.process.writing);


module.exports = router;