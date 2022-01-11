"use strict";

const UserStorage = require("../../models/UserStorage");
const User = require("../../models/User");
const Email = require("../../models/email");

const output = {
    hello: (req, res)=>{
        res.render("home/index");
    },

    login: (req, res)=>{
        res.render("home/login");
    },

    register0: (req, res)=>{
        res.render("home/register0");
    },

    register: (req, res)=>{
        res.render("home/register");
    },

    register2: (req, res)=>{
        res.render("home/register2");
    },
    // phone: (req, res) =>{
    //     res.render("home/phone")
    // }
};



const process = {
    login: async (req, res)=>{
        const user = new User(req.body);
        const response = await user.login();
        return res.json(response);
    },

    register: async (req, res)=>{
        const user = new User(req.body);
        const response = await user.register();
        return res.json(response);
    },

    email: async (req, res)=>{
        const email = new Email(req.body);
        const response = await email.sendEmail();
        console.log(response);
        return res.json(response);
    }
};


module.exports = {
    output,
    process
};
