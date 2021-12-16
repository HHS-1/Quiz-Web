"use stirct";

const fs = require("fs").promises;

class UserStorage{

    static #getUserInfo(data, id)
    {
        const users = (JSON.parse(data));
        const idx = users.id.indexOf(id);
        const usersKey = Object.keys(users);
        const userInfo = usersKey.reduce((newUsers, info) =>{
            newUsers[info] = users[info][idx];
            return newUsers;
        }, {});
        return userInfo;
    }

    static getUsers(...fields){
        // const users = this.#users;
        const newUsers = fields.reduce((newUsers, fields) => {
            if (users.hasOwnProperty(fields)){
                newUsers[fields] = users[fields];
            }
            return newUsers;
        }, {});
        return newUsers;
    }

    static getUserInfo(id){
        return fs.readFile("./src/databases/users.json")
          .then(data => {
            return this.#getUserInfo(data, id);
          })
          .catch(console.error);

    }


    static save(userInfo){
        // const users = this.#users;
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.psword.push(userInfo.psword);
        return { success : true};
    }

}

module.exports = UserStorage;   