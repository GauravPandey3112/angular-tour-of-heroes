const express=require('express');
const router=express.Router();
const user=require('../controller/user.Controller')


router.post('/register',user.addUser)
router.post('/login',user.login)
router.get('/user',user.verifyToken,user.getUser)

router.get('/heroes',user.verifyToken ,user.getHeroes)
router.post('/heroes',user.verifyToken ,user.updateHero)
router.get('/heroes/:id',user.verifyToken ,user.getHero)
router.post('/add-hero',user.verifyToken  ,user.addHero)
router.delete('/delete/:id',user.verifyToken  ,user.deleteHero)

router.get('/search',user.searchHero);



module.exports=router;