const express=require('express');
const router=express.Router();
const user=require('../controller/user.Controller')
const heroes=require('./heroes.routes')


router.post('/register',user.addUser)
router.post('/login',user.login)
router.get('/user',user.verifyToken,user.getUser)

router.use('/heroes',user.verifyToken,heroes)



module.exports=router;