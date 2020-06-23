
const mongoose = require("mongoose");
passportLocalMongoose = require('passport-local-mongoose');
let bcrypt = require('bcryptjs')
 // connection
const connectiondb = "mongodb+srv://sokmok000:sokmok0000@cluster0-izngf.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(connectiondb,{useNewUrlParser: true , useUnifiedTopology: true})

let dbtell = mongoose.connection;
dbtell.on("error",console.error.bind(console,"connection error"))

let databaseSchema = new mongoose.Schema({
    username : {
        type : String , unique : true
    },
    email : {
        type : String , unique : true
    },
    password : {
        type : String
    },
    Name: {
        type : String
    },
    Surename: {
        type : String
    },
    Housenumber: {
        type : String
    },
    Province: {
        type : String
    },
    District: {
        type : String
    },
    Postalcode: {
        type : String
    },
    IDCard: {
        type : String
    },
    Telephone: {
        type : String
    },
    Size: {
        type : String
    },
    Gender: {
        type : String
    },
    image: {
        type : String
    },
    Road: {
        type : String
    },
    Parish: {
        type : String
    },
    sneakers : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Sneaker"
        }
    ]
})
databaseSchema.plugin(passportLocalMongoose);   
module.exports = mongoose.model("Sign Ups",databaseSchema)

        

    
  
   