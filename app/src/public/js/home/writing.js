"use strict";

const title = document.querySelector("#title"),
    body = document.querySelector("#summernote"),
    tag = document.querySelector("#tag"),
    submit = document.querySelector("#submit"),
    cancel = document.querySelector("#cancel");


    submit.addEventListener("click",write);
    cancel.addEventListener("click", back);

    function write(){
        const req = {
            title : title.value,
            body : body.value,
            tag : tag.value 
        };
        fetch("/writing",{
            method : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req),
        }).then((res) => res.json())
          .then((res) =>{
            if(res.success) {
                location.href = "/board";
            } else{
                alert(res.msg);
            }
        })
        .catch(err => {
            //   console.error(new Error("로그인 중 에러 발생"));
        });
    }
    

    function back(){
        location.href = "/board";
    }