"use strict";



// const page = 1;

// function showlist(info){
//     let list = '';
//     const totaldata = info.length;
//     const perpage = 10;
//     const totalpage = totaldata/perpage;
//     const length = info.length-1;
//     for(let i = length-perpage*(page-1) ; i >length-perpage*page ; i--){
//       list = list + `
//           <tr>
//           <td>${info[i].number}</td>
//           <td>${info[i].title} </td>
//           <td>${info[i].user} </td>
//           <td style="font-size : 13px;">${info[i].in_date} </td>
//           </tr>
//       `
//     }
//     document.getElementById('list').innerHTML = list;
    
//   }

  function move(num){
    let page = num;
    let req = {
        page : page,
    }

    fetch("/board", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(req),
        }).then((res) => res.json())
          .then((res) =>{
              if(res.success) { 
                  
                  location.href = "/board";
              } else{
                  alert(res.msg);
              }
              
          })
  }
  

// const fch = fetch("/board", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     // body : JSON.stringify(),
// }).then((res) => res.json())
//   .then((res) =>{
//       if(res) {  
//           showlist(res);
//       } else{
//           alert(res.msg);
//       }
      
//   })
//   .then((res) =>{
    
//   })
//   .catch(err => {
//         console.error(new Error("로그인 중 에러 발생"));
//   });


  
  