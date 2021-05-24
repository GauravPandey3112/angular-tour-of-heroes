const userModel=require('../model/user.model')
const heroModel=require('../model/heroes.model')
const bcrypt= require('bcrypt');

const jwt=require('jsonwebtoken');
const { rawListeners } = require('../model/user.model');

const userController={
    addUser:async (req,res)=>{
        let userData=req.body;
        let password=req.body.password;
        req.body.password=await bcrypt.hash(password,8)
        let user=new userModel(userData);
        
        user.save((err,user)=>{
            if(err){
                console.error(err);
            }else{
                let payload={subject: user._id}
                let token=jwt.sign(payload,process.env.SECRET_KEY)
                res.status(200).send({token})
            }
        })
    },
    login:(req,res)=>{
        let userData=req.body;
        userModel.findOne({email:userData.email}).then(async (result) => {
            if(!result){
                res.status(401).send('Invalid email')
            }else{
                if(!(await bcrypt.compare(userData.password,result.password))){
                    res.status(401).send('Invalid password')
                }else{
                    let payload={subject: result._id}
                    let token=jwt.sign(payload,process.env.SECRET_KEY)
                    res.status(200).send({token})
                }
            }
        }).catch((err) => {
            console.log(err)
        });
    },
    getUser:(req,res)=>{
        let token=req.headers.authorization.split(' ')[1];
        let payload=jwt.verify(token,process.env.SECRET_KEY);
        let userId=payload.subject;
        userModel.findOne({_id:userId}).then((result) => {
        if(!result){
                res.status(401).send('No User Found')
        }else{
                res.status(200).send(result)
        }
        }).catch((err) => {
            console.log(err);
        });

    },

    getHeroes:(req,res)=>{
        heroModel.find({}).then((result) => {
            if(!result){
                res.status(401).send('No heroes Found')
            }else{
                res.status(200).send(result)
            }
        }).catch((err) => {
            console.log(err);
        });
    },
    getHero:(req,res)=>{
        heroModel.findOne({_id:req.params.id}).then((result) => {
            if(!result){
                res.status(401).send('No hero Found')
            }else{
                res.status(200).send(result)
            }
        }).catch((err) => {
            console.log(err);
        });
    },
    addHero:(req,res)=>{
        let heroData=req.body;
        console.log("HeroAdd:",heroData);
        let hero=new heroModel({name:heroData.name});

        hero.save((err,hero)=>{
            if(err){
                console.error(err);
            }else{
                res.status(200).send(hero)
            }
        })
    },
    updateHero:(req,res)=>{
        let id=req.body._id;
        let heroData=req.body;
        heroModel.findOneAndUpdate({_id:id},{name:heroData.name}).then((result) => {
            res.status(200).send('Hero Updated')
        }).catch((err) => {
            console.log(err);
        });
    },

    deleteHero:(req,res)=>{
        
        let id=req.params.id;
        console.log("Delete",id);
        heroModel.findOneAndRemove({_id:id}).then((result) => {
            res.status(200).send('Hero Deleted')
        }).catch((err) => {
            console.log(err);
        });
    },
    searchHero:(req,res)=>{
        let input =req.query.name;
        heroModel.find({name:{$regex:input,$options:'i'}}).then((result) => {
            res.status(200).send(result)
        }).catch((err) => {
            console.log(err);
        });
    },

    verifyToken:(req,res,next)=>{
        if(!req.headers.authorization){
            return res.status(401).send('Unauthorized request')
        }
        let token=req.headers.authorization.split(' ')[1];
        if(token==='null'){
            return res.status(401).send('Unauthorized request')
        }
        let payload=jwt.verify(token,process.env.SECRET_KEY)
        if(!payload){
            return res.status(401).send('Unauthorized request')
        }
        req.userId=payload.subject;
        next();
    }
}

module.exports=userController;