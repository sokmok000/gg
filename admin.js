const express = require("express");
let router = express.Router();
const passport = require('passport')
const sneaker = require("./model/sneaker")

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
  sneaker.find(function(err,seeall){
    if(err){
      console.log("error")
    }else{
      res.render("admin",{seeall:seeall})
    }
  })
});

 
    
     

router.get('/admin/sneaker/add', function(req, res) {

    res.render('add');
  });

router.post("/admin/sneaker/add",function(req , res ){
    sneaker.create(new sneaker({Name :req.body.Name, Minidetail :req.body.Minidetail,Detail:req.body.Detail, Size:req.body.Size,Price:req.body.Price, Image:req.body.Image , Brand :req.body.Brand , Color :req.body.Color
    })
    )
    req.flash('success','Add Sneaker Success');
    res.redirect("/admin")
})

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

 


router.get('/admin/sneaker/:id/detail', function(req, res) {
  sneaker.findById({_id:req.params.id},function(err,edit){
    if(err){
      console.log("error@@")
    }else{
      res.render('admindetails3',{edit:edit})
    }
  })
 
})




router.get('/admin/sneaker/:id/edit', function(req,res){
 sneaker.findById({_id:req.params.id},function(err, editsneaker){
      if(err){
          console.log("error!!");
      } else {
          res.render('editdetail', {editsneaker:editsneaker});
      }
  })
});

// router.put("/admin/sneaker/:id/detail",function(req,res){
//   sneaker.findByIdAndUpdate(req.params.id, req.body.Name ,req.body.Minidetail,req.body.Detail,req.body.Price,req.body.Size,req.body.Brand,req.body.Colour,req.body.Image , function(err,update){
//     if(err){
//       res.redirect("/admin")
//     }else{
//       res.redirect("/")
//     }
//   })
// })
router.post('/admin/sneaker/:id/edit',function(req,res){ 

  let Name = req.body.Name
  let Minidetail = req.body.Minidetail
  let Detail = req.body.Detail
  let Size= req.body.Size
  let Price= req.body.Price
  let Image= req.body.Image
  let Brand= req.body.Brand
  let Color= req.body.Color
  // sneaker.findById({_id:req.params.id},function(err,good){
  //   if(err)
  //   console.log(err)
  //   else{
 
  sneaker.updateMany({_id:req.params.id},{$set : {Name:Name,Minidetail:Minidetail,Detail:Detail,Size:Size
  ,Price:Price,Image:Image,Brand:Brand,Color:Color}} ,function(err, update){
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