"use strict";

//모듈
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
    
const accessLogStream = require("./src/config/log");

//라우팅
const home = require("./src/routes/home/index");

const logger = require("./src/config/logger");


//앱 세팅
app.set("views", "./src/views");
app.set("view engine" , "ejs");

app.use(express.json());

app.use(express.urlencoded({extended: true}));//url을 통해 전달되는 데이터에 한글, 공백 등의 문자가 포함될 경우 제대로 인식되지 않는 문제 해결

app.use(express.static(`${__dirname}/src/public`));

app.use(morgan('tiny'));
app.use(morgan("common", {stream : accessLogStream}));

app.use("/",home); //use >> 미들웨어를 등록해주는 메서드


module.exports = app;
