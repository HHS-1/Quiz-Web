"use strict";

const nodemailer = require("nodemailer");
const rand = require("../../rand");
const check = require("../../authEmail");

class Email {
    constructor(body){
        this.body = body;
    }
    
    async sendEmail() {

        try{
            const USEREMAIL = this.body.USEREMAIL
            const authNumber = rand.authNo(6);
            const authEmail = check.authEmail(USEREMAIL);

            if(authEmail){
                console.log("이메일 형식이 잘못되었습니다.");
                return {success : false};
            }

            const email = {
                host: "smtp.naver.com",
                port: 465,
                sequre: "true",
                auth: {
                    user: EMAIL_USER, // generated ethereal user
                    pass: EMAIL_PASS, // generated ethereal password
                },  
            };
            
            const content = {
                from : EMAIL_FROM,
                to : USEREMAIL,
                subject : "HAROO(하루)에서 인증번호가 도착했습니다.",
                text : `인증번호 ${authNumber}을 입력해주세요`,
            };
    
            const transporter = nodemailer.createTransport(email);

            return new Promise((resolve, reject) => {
                 transporter.sendMail(content, (err,info)=>{
                    if(err) reject ({success : false});
                    else {
                        console.log(info);
                        resolve({success : true});
                    }
                });
            })
        }catch(error){
            console.log(error);
        }
        
    }

}
module.exports =  Email;

 // const send = async(data) => {
            //    return new Promise((resolve,reject) => {
            //             nodemailer.createTransport(email).sendMail(data),
            //             (error, info) => {
            //             if(error){
            //                 reject(err);
            //             }else{
            //                 resolve(console.log(info), {success : true});
            //             }
            //         };
            //     }) 
            // };
            // return send(content);