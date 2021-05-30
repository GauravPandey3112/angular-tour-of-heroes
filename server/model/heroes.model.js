const mongoose=require('mongoose');

const Schema=mongoose.Schema

const heroSchema=new Schema({
    name:String,
    imagePath:String,
    description:String,
    addedBy:String,
    updatedBy:String
})

module.exports=mongoose.model('heroes',heroSchema,'heroes');