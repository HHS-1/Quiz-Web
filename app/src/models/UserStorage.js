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

    static getUserInfo(id){
        const users = this.#users;
        const idx = users.id.indexOf(id);
        const usersKey = Object.keys(users);
        const userInfo = usersKey.reduce((newUsers, info) =>{
            newUsers[info] = users[info][idx];
            return newUsers;
        }, {});
        
        return userInfo; 
    }

    static save(userInfo){
        const users = this.#users;
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.psword.push(userInfo.psword);
        return { success : true};
    }

}

module.exports = UserStorage;   