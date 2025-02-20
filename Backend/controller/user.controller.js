const db = require('../db.js');

class UserController{
    async createUser(req,res){
        const {name,surname,email,password} = req.body;
        const newPerson = await db.query("insert into registration (name,surname,email,password) values ($1,$2,$3,$4) returning *", [name,surname,email,password]);

        res.json(newPerson.rows[0]);
    }
    async getUsers(req,res){
        const users = await db.query("select * from registration")
        res.json(users.rows);
    }
    async getOneUser(req,res){
        const id = req.params.id;
        const users = await db.query("select * from registration where id = $1", [id]);
        res.json(users.rows[0]);
    }
    async updateUser(req,res){
        const {id,name,surname,email,password} = req.body;
        const users = await db.query("update registration set name = $1,surname = $2,email = $3,password = $4 where id = $5 returning *",[name,surname,email,password,id]);
        res.json(users.rows[0]);
    }
    async deleteUser(req,res){
        const id = req.params.id;
        const users = await db.query("delete from registration where id = $1", [id]);
        res.json(users.rows[0]);
    }
}

module.exports = new UserController();