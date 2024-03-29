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
    
    if(!client.id) return {success : false , msg : "아이디를 입력해주세요."};
    if(!client.psword) return {success : false , msg : "비밀번호를 입력해주세요."};
    try {
      const user = await UserStorage.getUserInfo(client.id);
      
      if (user) {
        if (user.id === client.id && user.psword === client.psword) {
          return { success: true };
        }else{
          return { success: false, msg: "비밀번호가 틀렸습니다." };
        }
      }else{
        return { success: false, msg: "존재하지 않는 아이디입니다." };
      }

      

    } catch (err) {
      return { success: false, err };
    }
  }

  async register() {
    const client = this.body;
    console.log(client);
    const USEREMAIL = client.USEREMAIL;
    if(client.id){
      try {
        const getauth = await UserStorage.getauth(USEREMAIL);
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
    }else if(!client.id){
      try {
        const getauth = await UserStorage.getauth(USEREMAIL)
        if(getauth){
          console.log(client.authNumber);
          console.log(getauth);
          if(client.authNumber !== getauth){
            return { success : false , msg : "인증번호가 일치하지 않습니다."};
          }else{
            return {success : true , msg : "인증성공"};
          }
        }
      } catch (err) {
        return { success: false, msg : "아이디 찾기 이메일 인증중 오류" };
      }
    }
    
  }
  async sendEmail() {

    try{
        const name = this.body.Name;
        const USEREMAIL = this.body.USEREMAIL;
        const authNumber = this.authNumber;
        const authEmail = check.authEmail(USEREMAIL);

        if(authEmail){
            console.log("이메일 형식이 잘못되었습니다~");
            return {success : false};
        }//이메일 형식검사

        const userCheck = await UserStorage.getId(USEREMAIL);
        
        if(typeof userCheck[0] == "undefined"){
          
          return {success : false , msg : 404};
        }
        if(name){
          let count = 0;
          for(let i = 0 ; i < userCheck.length ; i++){
            if(userCheck[i].name === name || userCheck[i].email === USEREMAIL){
              count++;
            }
            if(count==0){
              return {success : false , msg : "사용자정보불일치"};
            }
          }
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
      return {success : false, msg: `${err}`};
    }
  }
  async getting(){
    try{
      const get = await UserStorage.getquiz();
      // console.log(get);
      return get;
    }catch(err){
      return {success : false, msg: "error"};
    }
  }

  async finidingId(){
    try{
      const client = this.body;
      console.log(client);
      const user = {
        email : client.USEREMAIL,
        name : client.Name,
      };
      const fId = await UserStorage.getId(user.email);
      
      let idPackage = new Array();
      for(let i = 0 ; i < fId.length ; i++){
        if(fId[i].name === user.name && fId[i].email === user.email){
          idPackage.push(fId[i].id);
        }
      }
      
      // return idPackage;
      return idPackage;
    }catch(err){
      return {success : false, msg: "사용자 정보가 올바른 지 확인해주세요."};
    }
  }
}

module.exports = User;