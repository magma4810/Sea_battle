const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller');

router.post('/createNewUser', userController.createNewUser);
router.get('/getUser/:id', userController.getUser);

module.exports = router;