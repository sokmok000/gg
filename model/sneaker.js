const   mongoose = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose');
        let sneaker = new mongoose.Schema({
            username : {
                type : String
            },
            Namesneaker : {
                type : String
            },
            Minidetail : {
                type : String
            },
            Detail : {
                type : String
            },
            Sizesneaker :{
                type : String
            },
            
            Price : {
                type : Number
            },
            Image : {
                type : Array

            },
            Brand : {
                type : String
            },
            Color : {
                type : String
            },
            Count: {
                type : Number
            },
            
            Date: {
                type : Date
            },
            versionKey: false ,
            users : [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"Sign Ups"
                }
            ],
          
        
        })


        sneaker.plugin(passportLocalMongoose);   
module.exports = mongoose.model("Sneaker",sneaker)
