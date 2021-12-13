"use stirct";

class UserStorage{
    static #users = {
        id: ["하현수" , "현수" , "HHS"],
        psword: ["123" , "1234", "321"],
        name: ["바리" , "초코", "하양이"],
    }; 

    static getUsers(...fields){
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, fields) => {
            if (users.hasOwnProperty(fields)){
                newUsers[fields] = users[fields];
            }
            return newUsers;
        }, {});
        return newUsers;
    }

}

module.exports = UserStorage;   