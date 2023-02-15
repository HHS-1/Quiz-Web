"use strict";


const User = require("../../models/User");


const output = {
    hello: (req, res)=>{
        req.session.page = 1;
        if(req.session.logined){
            req.session.save(function(){
                res.render("home/index",{
                    owner : true,
                    ID : req.session.ID,
                });
            })
        }else{
            res.render("home/index",{
                owner : false,
            });
        }
        
    },

    login: (req, res)=>{
        res.render("home/login");
    },

    logout: (req, res)=>{
        req.session.destroy(function(err){
            if(err) console.log(err);
            res.redirect('/');
        })
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
    board: async (req, res)=>{
        const user = new User;
        const info = await user.getting();
        // console.log(info.length);
        if(req.session.logined){
            let page = req.session.page,
                totaldata = info.length,
                totalpage = Math.ceil(totaldata/10);
            // console.log(info);
            req.session.save(function(){
                res.render("home/board",{
                    owner : true,
                    ID : req.session.ID,
                    quiz : info,
                    page : page,
                    perpage : 10,
                    length : info.length-1,
                    totalpage : totalpage,
                });
            })
        }else{
            res.render("home/board",{
                owner : false,
                // quiz : info,
            });
        }
    },
    writing: (req, res)=>{
        if(req.session.logined){
            req.session.save(function(){
                res.render("home/writing",{
                    owner : true,
                    ID : req.session.ID,
                }
            )})
        }else{
            res.render("home/writing",{
                owner : false,
            });
        }
    },
    findingid: (req, res)=>{
        res.render("home/findingid",{
            ID : req.idPackage,
        });
    },
    
    findingpw: (req, res)=>{
        res.render("home/findingpw");
    },

    findingid2: (req, res)=>{
        res.render("home/findingid2");
    }
};



const process = {
    login: async (req, res)=>{
        const user = new User(req.body);
        const response = await user.login();
        if(response.success){
            req.session.logined = true;
            req.session.ID = req.body.id;
        }
        return res.json(response);
    },

    register: async (req, res)=>{
        // console.log(req.body);
        const user = new User(req.body);
        const response = await user.register();
        return res.json(response);
    },

    email: async (req, res)=>{
        const user = new User(req.body);
        const response = await user.sendEmail();
        console.log(response);
        return res.json(response);
    },

    board: async(req, res)=>{
        req.session.page = req.body.page;
        const response = {success : true};
        return res.json(response);
    },

    writing: async (req, res)=>{
        req.body.user = req.session.ID;
        const quiz = new User(req.body);
        const response = await quiz.writing();
        return res.json(response);
    },

    finding: async (req, res)=>{
        const user = new User(req.body);
        const response = await user.sendEmail();
        console.log(response);
        
        return res.json(response);
    },

    findingID: async (req, res)=>{
        const user = new User(req.body);
        const response = await user.register();
        console.log(response);
        if(response.success){
            const response2 = await user.finidingId();
            response.id = response2;
            req.idPackage = response.id;
        }
        return res.json(response);
    }
};


module.exports = {
    output,
    process
};
