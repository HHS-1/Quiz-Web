"use strict";


const check = {
    authEmail : (email) => {
        const vaildCheck = email.indexOf("@");
        if(!email || email.length ===0 || vaildCheck === -1){
                    return true;
        }
    }
}

module.exports = check