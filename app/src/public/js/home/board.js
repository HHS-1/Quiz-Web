"use strict";

const first = 0;
const perpage = 10;

function showlist(info){
    let list = '';
    const length = info.length-1;
    for(let i = length ; i >=length-perpage ; i--){
      list = list + `
          <tr>
          <td>${info[i].number}</td>
          <td>${info[i].title} </td>
          <td>${info[i].user} </td>
          <td style="font-size : 13px;">${info[i].in_date} </td>
          </tr>
      `
    }
    document.getElementById('list').innerHTML = list;
  }



fetch("/board", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    // body : JSON.stringify(),
}).then((res) => res.json())
  .then((res) =>{
      if(res) {  
          showlist(res);
          
      } else{
          alert(res.msg);
      }
      
  })
//   .catch(err => {
//         console.error(new Error("로그인 중 에러 발생"));
//   });


  
  