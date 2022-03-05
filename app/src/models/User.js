"use strict";

const UserStorage = require("./UserStorage");
const nodemailer = require("nodemailer");
const rand = require("../../rand");
const check = require("../../authEmail");
const number = require("../../rand");

class User {
  constructor(body) {
    this.body = body;
    this.authNumber = rand.authNo(6);
  }
  

  async login() {
    const client = this.body;
    try {
      const user = await UserStorage.getUserInfo(client.id);
      

      if (user) {
        if (user.id === client.id && user.psword === client.psword) {
          return { success: true };
        }
        return { success: false, msg: "비밀번호가 틀렸습니다." };
      }

      return { success: false, msg: "존재하지 않는 아이디입니다." };

    } catch (err) {
      return { success: false, err };
    }
  }

  async register() {
    const client = this.body;
    console.log(client);
    const USEREMAIL = client.USEREMAIL
    try {
      const getauth = await UserStorage.getauth(USEREMAIL)
      if(getauth){
        console.log(client.authNumber);
        console.log(getauth);
        if(client.authNumber !== getauth){
          return { success : false , msg : "인증번호가 일치하지 않습니다."};
        }else{
          const response = await UserStorage.save(client);
          return response;
        }
      }
    } catch (err) {
      return { success: false, msg : "사용할 수 없는 아이디입니다." };
    }
  }
  async sendEmail() {

    try{
        
        const USEREMAIL = this.body.USEREMAIL
        const authNumber = this.authNumber;
        const authEmail = check.authEmail(USEREMAIL);
        if(authEmail){
            console.log("이메일 형식이 잘못되었습니다.");
            return {success : false};
        }
        const Emailauth = {
          email : USEREMAIL,
          auth : authNumber
        }

        const save = await UserStorage.emailauth(Emailauth);
        const dlt = setTimeout(()=>{
          UserStorage.emaildelete(USEREMAIL);
        },180000); 
        
        
        
        if(save){
          dlt;
          const email = {
            host: "smtp.naver.com",
            port: 465,
            sequre: "true",
            auth: {
                user: process.env.EMAIL_USER, // generated ethereal user
                pass: process.env.EMAIL_PASS, // generated ethereal password
            },  
        };
        
        const content = {
            from : process.env.EMAIL_FROM,
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
                    resolve({success : true, number : authNumber});
                }
            });
        })
      }

    }catch(error){
        console.log(error);
    }
  }

  async writing(){
    try{
      const client = this.body;
      console.log(client);
      const save = await UserStorage.savequiz(client);
      return save;
    }catch(err){
      return {success : false, msg: "error"};
    }
  }
  async getting(){
    try{
      const get = await UserStorage.getquiz();
      // console.log(get);
      return {get};
    }catch(err){
      return {success : false, msg: "error"};
    }
  }
}

module.exports = User;