const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller');

router.post('/createNewUser', userController.createNewUser);
router.get('/getUserPassword/:login', userController.getUserPassword);
router.get('/getStatUsers', userController.getStatUsers);
router.get('/getStatUserByNickname/:nickname', userController.getStatUserByNickname);
router.put('/updateStatUserByNickname/:nickname', userController.updateStatUserByNickname);
router.put('/updateDefeatAndWinrate/:nickname', userController.updateDefeatAndWinrate);

module.exports = router;