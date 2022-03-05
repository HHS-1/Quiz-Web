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
    timeout2 = document.querySelector(".timeout2"),
    threeminute = document.querySelector("#time");
    registerBtn.addEventListener("click", register);
    mailBtn.addEventListener("click", Email);

const startMinutes = 3;
let time = startMinutes * 60;


function Email() {

    const req = {
        USEREMAIL : mail.value,
        authNumber : authNumber.value
    };
    const startMinutes = 3;
    let time = startMinutes * 60;
    
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
                setInterval(updateCountdown, 1000);
                function updateCountdown() {
                    const minutes = Math.floor(time/60);
                    let seconds = time % 60;
                    seconds = seconds < 10 ? '0' + seconds : seconds;
                    threeminute.innerHTML = `(${minutes}:${seconds})`;
                    time--;
                    if(minutes === 0 && seconds === 0){
                        return;
                    }
                }
            }else {
                alert("이메일 형식이 잘못되었습니다.");
            }
        })
        
        .catch(err => {
            console.log(err);
        })
        
    
        
}



function register() {
    // if(!id.value || !psword.value || !name.value) return alert("입력되지 않은 정보가 있습니다.");
    

    const req = {
        id : id.value,
        name : name.value,
        psword : psword.value,
        authNumber : authNumber.value,
        USEREMAIL : mail.value,
    };

    if(!id.value) return alert("아이디를 입력해주세요.");
    if(!psword.value) return alert("비밀번호를 입력해주세요.");
    if(!name.value) return alert("이름를 입력해주세요.");
    if(!authNumber.value) return alert("인증번호를 입력해주세요.");

    if(psword.value !== pswordConfirm.value){
        return alert("비밀번호가 일치하지 않습니다!");
    }
    
    
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






