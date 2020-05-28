const express = require("express");
let router = express.Router();
const passport = require('passport')
const sneaker = require("./model/sneaker")
const plimit = require('p-limit');

const multer = require('multer');
let User = require("./model/db");
let app = express()

let savesneaker = multer.diskStorage(
  {
  destination:function(req,file,sn){
    sn(null,"./public/images/img-profile/");
  },
  filename:function(req,file,sn){
   

    sn(null,file.originalname);
  }
})

let editsneaker = multer({storage : savesneaker});



router.get('/admin', function(req, res) {
  sneaker.find({},function(err,newsneaker){
    if(err){
      console.log("error")
    }else{

      res.render("admin",{newsneaker:newsneaker})
    }
  }).sort({$natural:-1}).limit(3)
});



router.get('/admin/sneaker/editlist', function(req, res) {
 sneaker.find(function(err,findall){
   if(err){
     console.log("error")
   }else{
    res.render('editlist',{findall:findall});
   }
 }
 )
})

 //ADD

router.get('/admin/sneaker/:id/detail', function(req, res) {
  sneaker.findById({_id:req.params.id},function(err,edit){
    if(err){
      console.log("error@@")
    }else{
      res.render('admindetails3',{edit:edit})
    }
  })
 
})

router.get('/admin/sneaker/add', function(req, res) {

  res.render('add');
});

router.post("/admin/sneaker/add",function(req , res ){
  sneaker.create(new sneaker({Namesneaker :req.body.Namesneaker, Minidetail :req.body.Minidetail,Detail:req.body.Detail, Sizesneaker:req.body.Sizesneaker,Price:req.body.Price, Image:req.body.Image , Brand :req.body.Brand , Color :req.body.Color,Count :req.body.Count,Date :req.body.Date
  })
  )
  req.flash('success','Add Sneaker Success');
  res.redirect("/admin")
})

//EDIT 

router.get('/admin/sneaker/:id/edit', function(req,res){
 sneaker.findById({_id:req.params.id},function(err, editsneaker){
      if(err){
          console.log("error!!");
      } else {
          res.render('editdetail', {editsneaker:editsneaker});
      }
  })
});


router.post('/admin/sneaker/:id/edit',function(req,res){ 

  let Namesneaker = req.body.Namesneaker
  let Minidetail = req.body.Minidetail
  let Detail = req.body.Detail
  let Sizesneaker= req.body.Sizesneaker
  let Price= req.body.Price
  let Image= req.body.Image
  let Brand= req.body.Brand
  let Color= req.body.Color
  let Count= req.body.Count
  

  sneaker.updateMany({_id:req.params.id},{$set : {Namesneaker:Namesneaker,Minidetail:Minidetail,Detail:Detail,Sizesneaker:Sizesneaker,Price:Price,Image:Image,Brand:Brand,Color:Color,Count:Count}} ,function(err, update){
      if(err){
          console.log(err);
      } else {
           req.flash('success','Edit Sneaker Success');
          res.redirect('/admin')
          }
      }
  );
    
  }
    )


//Remove 

    router.get('/admin/sneaker/:id/remove', function(req,res){ 
      sneaker.remove({_id:req.params.id},function(err,remove){
          if(err)
          console.log("error")
          else 
          {
              console.log(remove)
              req.flash('success','You Remove Sneaker Successful');
              res.redirect("/admin")
              
          }
      })
       
    });
       






router.get("/nike",function(req,res){
  sneaker.find({Brand:"nike"},function(err,nike){
    if(err){
      console.log("error")
    }else{
      res.render("nike",{nike:nike})
    }
  })
});


router.get("/adidas",function(req,res){
  sneaker.find({Brand:"adidas"},function(err,adidas){
    if(err){
      console.log("error")
    }else{
      res.render("adidas",{adidas:adidas})
    }
  })
});

router.get("/jordan",function(req,res){
  sneaker.find({Brand:"jordan"},function(err,jordan){
    if(err){
      console.log("error")
    }else{
      res.render("jordan",{jordan:jordan})
    }
  })
});







module.exports = router;