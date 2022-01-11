"use strict";

const icon = document.querySelector("#menuicon"),
      sidebar = document.querySelector("#sidebar"),
      xicon = document.querySelector("#xicon");



icon.addEventListener("click" , () => {
    sidebar.style.visibility = "visible";
    });

xicon.addEventListener("click" , () => {
    sidebar.style.visibility = "hidden"
    });
 

