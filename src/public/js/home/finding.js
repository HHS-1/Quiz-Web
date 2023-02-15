"use strict";

const NAME = document.querySelector("#name"),
      email = document.querySelector("#email_certify"),
      authnum = document.querySelector("#authnum"),
      findId = document.querySelector(".inputmenu"),
      showId = document.querySelector(".inputmenu2");
function sendmail() {

    const req = {
        USEREMAIL : email.value,
        Name : NAME.value,
    }


    fetch("/finding", {
        method : "POST",
        headers : {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(req),
    })
    .then((res) => res.json())
    .then((res) => {
        if(res.success){
            alert("전송");
            
        }else if(res.msg === 404){
            alert("해당 메일로 가입된 정보가 없습니다.");
        }else{alert("사용자 정보가 일치하지않습니다.");}
    })
    .catch(err => {
        console.log(err);
    })
}

function emailauth(){
    const req = {
        USEREMAIL : email.value,
        authNumber : authnum.value,
        Name : NAME.value,
        
    };

    fetch("/findingid", {
        method : "POST",
        headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*"
        },
        body : JSON.stringify(req),
    })
    .then((res)=> res.json())
    .then((res)=>{
        if(res.success){
            location.href = "/findingid";
        }else{
            alert("인증번호가 일치하지 않습니다!");
        }
        
    })
    .catch(err => {
        console.log("아이디 찾기 이메일 인증중 에러")
    })
}


