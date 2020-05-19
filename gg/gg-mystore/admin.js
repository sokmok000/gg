const express = require("express");
let router = express.Router();
const passport = require('passport')
const sneaker = require("./model/sneaker")
let User = require("./model/db");
let app = express()


router.get('/admin', function(req, res) {
  res.render('admin');
});


router.get('/admin/add', function(req, res) {
    res.render('add');
  });

router.post("/admin/add",function(req , res ){
    sneaker.create(new sneaker({Name :"", Minidetail :"",Detail:"", Size:"",Price:"", Image:"" , Type : "" , Colour:""
    })
    )
    res.redirect("/admin")
})






module.exports = router;