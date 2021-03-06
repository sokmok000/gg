
const mongoose = require("mongoose");
passportLocalMongoose = require('passport-local-mongoose');
let bcrypt = require('bcryptjs')
 // connection
const connectiondb = "mongodb+srv://sokmok000:sokmok0000@cluster0-izngf.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(connectiondb,{useNewUrlParser: true , useUnifiedTopology: true})

let dbtell = mongoose.connection;
dbtell.on("error",console.error.bind(console,"connection error"))

let databaseSchema = new mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    Username: {
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
    
   
    
  
          

})



 let User = module.exports = mongoose.model("Sign Ups",databaseSchema)

        


 module.exports.createUser=function(newUser,callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("newUser.password", salt, function(err, hash) {
            newUser.password=hash;
            newUser.save(callback);
        });
    });
 }


module.exports.getUserById=function(id,callback){
    User.findById(id,callback)
}
module.exports.getUserByName=function(name,callback){
    let query = {
        name:name
    }
    User.findOne(query,callback)
}
module.exports.comparePassword=function(password,hash,callback){
   bcrypt.compare(password,hash,function(err,ismatch){
       callback(null,ismatch)
   })
    }
  
    databaseSchema.plugin(passportLocalMongoose);   