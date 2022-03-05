"use stirct";

const { promiseImpl } = require("ejs");
const db =  require("../config/db");

class UserStorage{
    static getUserInfo(id){ 
        return new Promise((resolve, reject) =>{
            const query = "SELECT * FROM users WHERE id = ?;";
            db.query(query, [id], (err, data) => {
                if(err) reject(err);
                else resolve(data[0]);
            });
        });
    }


    static async save(userInfo){
        return new Promise((resolve, reject) =>{
            const query = "INSERT INTO users(id, name, psword, email) VALUES(?, ?, ?, ?);";
            db.query(query, [userInfo.id] , (err,data) => {
                db.query(query, [userInfo.id, userInfo.name, userInfo.psword, userInfo.USEREMAIL], (err, data) => {
                        if(err) reject(err);
                        else resolve({success : true});
                });
            });
        });
    }

    static async emailauth(emailauth){
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO Emailauth(email, auth) VALUES(?,?);";
            db.query(query, [emailauth.eamil] , (err,data) => {
                db.query(query, [emailauth.email , emailauth.auth], (err, data) => {
                    if(err) reject(err);
                    else resolve({success : true});
                });
            });
        });
    }
    static async emaildelete(email){
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM Emailauth WHERE email = ?";
            db.query(query, [email], (err, data) => {
                    if(err) reject(err);
                    else resolve({success : true});
            });
            
        });
    }

    static async getauth(email){
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM Emailauth WHERE email = ?;";
            db.query(query, [email], (err, data)=>{
                if(err) reject(err);
                else resolve(data[0].auth);
            });
        });
    }

    static async savequiz(quiz){
        return new Promise((resolve, reject) =>{
            const query = "INSERT INTO board1(title, body, tag, user) VALUES(?, ?, ?, ?);";
            db.query(query, [quiz.title] , (err,data) => {
                db.query(query, [quiz.title, quiz.body, quiz.tag, quiz.user], (err, data) => {
                        if(err) reject(err);
                        else resolve({success : true});
                });
            });
        });
    }

    static async getquiz(){
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM board1";
            db.query(query, (err, data)=>{
                if(err) reject(err);
                else resolve(data);
            })
        })
    }

}

module.exports = UserStorage;