"use strict";


const icon = document.querySelector(".menu_img"),
      sidebar = document.querySelector("#sidebar"),
      xicon = document.querySelector("#xicon"),
      usermenu = document.querySelectorAll(".usermenu2"),
      userid = document.querySelector(".userID");

icon.addEventListener("click" , () => {
    sidebar.style.visibility = "visible";
    });

xicon.addEventListener("click" , () => {
    sidebar.style.visibility = "hidden"
    });

    
userid.addEventListener("click" , ()=>{
    usermenu.forEach((usermenu) =>{
        if(usermenu.style.visibility === 'hidden'){
            usermenu.style.visibility = 'visible';
        } else{
            usermenu.style.visibility = 'hidden';
        }
    }); 
});