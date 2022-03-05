"use strict";

//모듈
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const session = require('express-session');
const cookieparser = require('cookie-parser');
const MySQLStore = require('express-mysql-session')(session);
    
const accessLogStream = require("./src/config/log");

//라우팅
const home = require("./src/routes/home/index");

const logger = require("./src/config/logger");


//앱 세팅
app.set("views", "./src/views");
app.set("view engine" , "ejs");

app.use(morgan('tiny'));
app.use(morgan("common", {stream : accessLogStream}));

app.use(cookieparser());
app.use(session({
    key : 'sid',
    secret : 'secret',
    resave : false,
    saveUninitialized : true,
    store : new MySQLStore({
        host: process.env.DB_HOST,
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    }),
    cookie : {
        maxAge : 24000* 60* 60
    },
}));

app.use(express.static(`${__dirname}/src/public`));

app.use(express.json());

app.use(express.urlencoded({extended: true}));//url을 통해 전달되는 데이터에 한글, 공백 등의 문자가 포함될 경우 제대로 인식되지 않는 문제 해결




app.use("/",home); //use >> 미들웨어를 등록해주는 메서드


module.exports = app;
