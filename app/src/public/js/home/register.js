"use strict";

const id = document.querySelector("#id"),
    name = document.querySelector("#name"),
    psword = document.querySelector("#psword"),
    pswordConfirm = document.querySelector("#psword_confirm"),
    registerBtn = document.querySelector("#rgs_btn"),
    mail = document.querySelector("#email_certify"),
    mailBtn = document.querySelector("#button2"),
    authNumber = document.querySelector("#authnum"),
    timeout = document.querySelector(".timeout"),
    timeout2 = document.querySelector(".timeout2");

    registerBtn.addEventListener("click", register);
    mailBtn.addEventListener("click", Email);



function Email() {

    const req = {
        USEREMAIL : mail.value,
        authNumber : authNumber.value
    };
    
        fetch("/register2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(req),
        })
        .then((res) => res.json())
        .then((res) =>{
            if(res.success){
                timeout.style.position = "relative";
                timeout.style.color = "rgb(9,187,246)";
                timeout2.style.position = "relative";
                timeout2.style.color = "rgb(9,187,246)";
            }else {
                alert("이메일 형식이 잘못되었습니다.");
            }
        })
        
        .catch(err => {
            console.log(err);
        })
        
    
        
}



function register() {
    if(!id.value) return alert("아이디를 입력해주십시오");
    if(psword.value !== pswordConfirm.value){
        return alert("비밀번호가 일치하지 않습니다!");
    }

    const req = {
        id : id.value,
        name : name.value,
        psword : psword.value,
        authNumber : authNumber.value,
        USEREMAIL : mail.value,
    };
    
    
    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req),
    }).then((res) => res.json())
      .then((res) =>{
          if(res.success) {
              location.href = "/login";
          } else{
              alert(res.msg);
          }
      })
      .catch(err => {
            console.error(err("회원가입 중 에러 발생"));
      });

    
}






