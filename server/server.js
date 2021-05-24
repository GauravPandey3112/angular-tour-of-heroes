const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv')
const mongoose=require('mongoose')
dotenv.config({path:'./.env'})

const db=`mongodb+srv://gaurav-dev:${process.env.DB_PASSWORD}@cluster0.jq1ly.mongodb.net/tourOfHeroes?retryWrites=true&w=majority`

mongoose.connect(db,err=>{
    if(err){
        console.error('Error:',err)
    }else{
        console.log('DB connected')
    }
})
const routes=require('./routes/user.routes');

const port=3000;

const app=express();
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.use('/',routes)

app.listen(port,()=>{
    console.log("Server running")
})