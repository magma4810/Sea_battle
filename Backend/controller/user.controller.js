const sequelize = require('../database');

class UserController{
    async createNewUser(req,res){
        const {username,login,password} = req.body;
        try {
            const [createNewUser, metadata] = await sequelize.query(
                'insert into "Users" (username,login,password) values(:username,:login,:password)',
                { 
                    replacements: {username,login,password} 
                } 
            );
            res.json(createNewUser);
        } catch (error) {
            console.error('Ошибка при добавлении нового пользователя:', error);
            res.status(500).json({ error: 'Ошибка при добавлении нового пользователя' });
        }
    }
    // async getUser(req,res){
    //     const id = req.params.id;
    //     try {
    //         const [getUser, metadata] = await sequelize.query(
    //             'select * from "Users" where id =:id',
    //             { 
    //                 replacements: {id} 
    //             } 
    //         );
    //         res.json(getUser);
    //     } catch (error) {
    //         console.error('Ошибка при получении данных пользователя:', error);
    //         res.status(500).json({ error: 'Ошибка при получении данных пользователя' });
    //     }
    // }

    async getUserPassword(req,res){
        const login = req.params.login;
        try {
            const [getWaiters, metadata] = await sequelize.query(
                `select password from "Users" where login = :login;`,
                { 
                    replacements: {login} 
                } 
            );
            res.json(getWaiters);
        } catch (error) {
            console.error('Ошибка при получении данных пользователя', error);
            res.status(500).json({ error: 'Ошибка при получении данных пользователя' });
        }
    }
}

module.exports = new UserController();