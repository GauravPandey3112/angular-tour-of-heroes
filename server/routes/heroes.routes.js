const express=require('express');
const router=express.Router();
const user=require('../controller/user.Controller')
const storage=require('../storage/storage')

router.get('/view-heroes' ,user.getHeroes)
router.post('/update-hero' ,storage,user.updateHero)
router.post('/update-hero-details' ,user.updateHeroDetails)
router.get('/hero/:id',user.getHero)
router.post('/add-hero',storage,user.addHero)
router.delete('/delete/:id',user.deleteHero)

router.get('/search',user.searchHero);

module.exports=router;