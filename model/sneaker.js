const   mongoose = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose');
        let sneaker = new mongoose.Schema({
            username : {
                type : String
            },
            Name : {
                type : String
            },
            Minidetail : {
                type : String
            },
            Detail : {
                type : String
            },
            Size : {
                type : String
            },
            Price : {
                type : String
            },
            Image : {
                type : String
            },
            Brand : {
                type : String
            },
            Color : {
                type : String
            }
        })


        sneaker.plugin(passportLocalMongoose);   
module.exports = mongoose.model("Sneaker",sneaker)
