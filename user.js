const express = require("express");
var router = express.Router();
const {check,validationResult}= require("express-validator");
let User = require("./model/db");
let sneaker = require("./model/sneaker")
let bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const passport = require("passport")
const passportLocal = require('passport-local');

const multer = require('multer');
const path =require("path")
const fs = require("fs")


let app = express()
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
passport.use('local', new passportLocal(User.authenticate()));
passport.serializeUser(function(user, done) { 
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  if(user!=null)
    done(null,user);
    
});
app.use((req,res,next)=>{
  res.locals.user = req.user || null
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  
  next();
})

let storage = multer.diskStorage({
  destination: "./public/uploadsuser",
  filename:function(req,file,cb){
    cb(null,file.fieldname + "+" + Date.now() + path.extname(file.originalname));
  }
})
const imagefilter = function(req,file,cb){
  var ext = path.extname(file.originalname)
  if(ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg" && ext !== ".gif" )
  {
    return cb(new Error("only image"), false)
  }
  cb(null,true)
}
let upload = multer({storage : storage,fileFilter : imagefilter});


router.get('/', function(req, res) {
  sneaker.find({Sizesneaker:"7 US"},function(err,newsneaker){
    if(err){
      console.log("error")
    }else{
      res.render("home2",{newsneaker:newsneaker})
    }
  }).sort({$natural:-1}).limit(3)
});



function enSureAuthenticated(req,res,next){
  if(req.isAuthenticated()){
        return next();
    }else{
      req.flash('error', 'You need to login first');
      res.redirect("/login")
      
}
}

router.get("/signup",function(req , res, ){
    res.render("signup2");
})
router.get("/login",function(req , res, ){
    res.render("login2");
})
router.get('/logout', function(req, res) {
  req.logout();
  req.flash("success","logout successfully")
  res.redirect('/');
});

router.get("/profile",function(req , res){
  User.findById(req.user._id).populate('sneakers').exec(function(error,user){
    if(error){
      console.log(error)
    }else{
     
      res.render("profile2",{user:user});
    }
  })

  }  )
// router.get("/profile",function(req , res){
//   User.find({}).populate('sneakers').exec(function(error,user){
//     if(error){
//       console.log(error)
//     }else{
//      console.log(user)
//       res.render("profile2",{user:user});
//     }
//   })

//   }  )


  


router.post("/login",passport.authenticate("local",{
          failureRedirect:"/login",
          successRedirect : "/",
          successFlash: true,            
         failureFlash: true,
          successFlash: "You log in successfully",
         failureFlash: "Invalid username or password "
}),
function(req , res){
})




router.post('/signup',function(req,res){
  User.register(new User({username:req.body.username,email:req.body.email,Name :"",Surename :"",Housenumber:"", Province:"", District:"", Postalcode:"", IDCard :"", Telephone:"", Size :"",Gender:"", image:"", Road:"", Parish:""
    }), req.body.password, function(err, user){
      if(err){
          console.log(err);
          req.flash('error','Username or Email had already used');
          return res.redirect('/signup')
      }
      passport.authenticate('local')(req,res,function(){
          req.flash('success','You Signup in successfully');
         res.redirect('/')
      });
  });
});
    




    router.get('/profile/:id/edit', function(req,res){
      User.findById({_id:req.user._id},function(err, edit){
          if(err){
              console.log("error");
          } else {
              res.render('edit',{edit:edit});
          }
      })
  });
  
  router.post('/profile/:id/edit',upload.single('image'),function(req,res){
//     if(!req.file){
//         console.log(req.file)
//     let Name = req.body.Name
//     let Surename = req.body.Surename
//     let Housenumber = req.body.Housenumber
//     let Province= req.body.Province
//     let District= req.body.District
//     let Postalcode= req.body.Postalcode
//     let IDCard= req.body.IDCard
//     let Telephone= req.body.Telephone
//     let Size= req.body.Size
//     let Gender= req.body.Gender
//     let image= req.file.filename
          
   
//     User.updateMany({_id:req.user._id},{$set : {Name:Name,Surename:Surename,Housenumber:Housenumber,Province:Province
//     ,District:District,Postalcode:Postalcode,IDCard:IDCard,Telephone:Telephone,Size:Size,Gender:Gender,image:image}} ,function(err, update){
//         if(err){
//             console.log(error);
//         } else {
//              req.flash('success','Edit profile success');
//             res.redirect('/profile')
//             }
//         }
//     );
// }
if(req.file){
  User.findById({_id:req.user._id},function(err,find){
    if(err){
      console.log(err)
    }else{
      const imageall = "./public/uploadsuser/" + find.image
      fs.unlink(imageall,function(err){
        if(err){
          console.log(err)
        }
      })
    }
    })
    var Name = req.body.Name;
    var Surename = req.body.Surename;
    var Housenumber = req.body.Housenumber
    var Province= req.body.Province
    var District= req.body.District
    var Postalcode= req.body.Postalcode
    var IDCard= req.body.IDCard
    var Telephone= req.body.Telephone
    var Size= req.body.Size
    var Gender= req.body.Gender
    var image= req.file.filename 
    var Road= req.body.Road
    var Parish= req.body.Parish
    
  }else{
    var Name = req.body.Name;
    var Surename = req.body.Surename;
    var Housenumber = req.body.Housenumber
    var Province= req.body.Province
    var District= req.body.District
    var Postalcode= req.body.Postalcode
    var IDCard= req.body.IDCard
    var Telephone= req.body.Telephone
    var Size= req.body.Size
    var Gender= req.body.Gender
    var Road= req.body.Road
    var Parish= req.body.Parish
    
  }
    User.updateMany({_id:req.user._id},{$set : {Name:Name,Surename:Surename,Housenumber:Housenumber,Province:Province
      ,District:District,Postalcode:Postalcode,IDCard:IDCard,Telephone:Telephone,Size:Size,Gender:Gender,image:image,Road:Road,Parish:Parish}} ,function(err, update){
        if(err){
            console.log(err);
        } else {
            req.flash('success','Edit profile success');
            res.redirect('/profile')
            }
        }
    );
});


router.get("/:id/:Namesneaker/buy",enSureAuthenticated,function(req,res){

  sneaker.findById(req.params.id,function(err,buy){
    if(err){
      console.log(err)
    }else{
      User.findById({_id: req.user._id},function(err,user){
        if(err){
          console.log(err)
        }else{
            res.render("checkbil",{buy:buy,user:user});
           }
            
            })
          }
          })
      })

    
  

  router.post("/:id/:Namesneaker/buy",enSureAuthenticated,function(req,res){
    User.findById(req.user._id,function(err,yes){
      if(err){
        console.log("error")
      }else{
        sneaker.findById({_id:req.params.id},function(err,ok){
          if(err){
            console.log(err)
          }else{
            sneaker.findOne({ $and: [{Namesneaker:req.params.Namesneaker},{Sizesneaker: req.body.Sizes} ]},function(err,omg){
              console.log(omg)
              if(omg == null){
                req.flash('error','DONT HAVE THIS SIZE');
                res.redirect("/" + req.params.id + "/" + req.params.Namesneaker + "/buy")
              }
              else if(omg.Count < 1){
                req.flash('error','THIS SIZE OUT STOCK');
                res.redirect("/" + req.params.id + "/" + req.params.Namesneaker + "/buy")
              }
              
              else{    
            sneaker.updateMany( { $and: [{Namesneaker:req.params.Namesneaker},{Sizesneaker: req.body.Sizes} ]},{$set : {Count:omg.Count-1 ,Date : Date()}},function(err,update){
              if(err){
                console.log(err)
              }else{ 
              User.updateMany({_id:req.user._id},{$set : {Name:req.body.Name,Surename:req.body.Surename,Housenumber:req.body.Housenumber,Province:req.body.Province
                ,District:req.body.District,Postalcode:req.body.Postalcode,IDCard:req.body.IDCard,Telephone:req.body.Telephone,Road:req.body.Road,Parish:req.body.Parish}}, function(err,update){
                  if(err){
                    console.log(err)
                  }else{
                    yes.sneakers.push(omg)
                    yes.save()
                    req.flash('success','BUY SUCCESS');
                    res.redirect("/profile")
                  }
              }
              )}
      
          })
        }
      })
    }
  })
}
    })
  })
    
  



  
// router.post("/:id/buy",enSureAuthenticated,function(req,res){
//     User.findById(req.user._id,function(err,yes){
//       if(err){
//         console.log("error")
//       }else{
//         sneaker.findById(req.params.id,function(err,ok){
//           if(err){
//             console.log(err)
//           }else{
//             sneaker.findOne({$or:[{"Size7.Size7": req.body.Sizes},{"Size8.Size8": req.body.Sizes }]},function(err,ready){
//               if(err){
//                 console.log(err)
//               }else{
//                 console.log(ready)
             
//                 sneaker.updateOne({_id:req.params.id},{$set: {Size7 : {Size7:ready.Size7.Size7,Count7:ready.Size7.Count7-1},Size8 : {Size8:ready.Size8.Size8,Count8:ready.Size8.Count8-1}}},function(err,update){
//                   if(err){      
//                     console.log(err)
//                   }else{
//                     console.log(update)
//                     yes.sneakers.push(ok)
//                     yes.save()
//                     res.redirect("/")
//               }
                  
//                           }
//                 )
                
//               }
//             })
          
//           }
              
//                       })
//                     }
//                   })
//                 })
                  
                
            
                // sneaker.find({$or:[{"Size7.Size7": req.body.Sizes },{"Size8.Size8": req.body.Sizes }]},function(err,ready){
                //   if(err){
                //     console.log(err)
                //   }else{
                //     console.log(ready)
                 

                // sneaker.find({$or:[{Size7 : {Size7: req.body.Sizes,Count7:ok.Size7.Count7} },{Size8 : {Size8: req.body.Sizes,Count8:ok.Size8.Count8} }]}

//   router.get("/:id/:Namesneaker/buy/shippinginfo",function(req,res){
//     User.findById({_id:req.user._id},function(err,info){
//       if(err){
//         console.log(err)
//       }else{
//         sneaker.findById({_id:req.params.id},function(err,sneaker){
//           if(err){
//             console.log(err)
//           }else{
            
//             res.render("shipping",{info:info,sneaker:sneaker})
//           }
//         })
//       }
//     })
//   })

//   router.post("/:id/:Namesneaker/buy/shippinginfo",function(req,res){
//     User.findById({_id:req.user._id},function(err,find){
//       if(err){
//         console.log(err)
//       }else{
       
          
//             User.updateMany({_id:req.user._id},{$set : {Name:req.body.Name,Surename:req.body.Surename,Housenumber:req.body.Housenumber,Province:req.body.Province
//               ,District:req.body.District,Postalcode:req.body.Postalcode,IDCard:req.body.IDCard,Telephone:req.body.Telephone}}, function(err,update){
//                 if(err){
//                   console.log(err)
//                 }else{
//                     res.redirect("/" + req.params.id + "/" + req.params.Namesneaker + "/buy")
//                 }
//           })
        
//       }
//   })
// })
  



router.get('/search', function(req,res){
  sneaker.findOne({Namesneaker: {$regex: req.query.findsneakers }},function(err,sneakershow){
        if(sneakershow == null){
          req.flash('error','CAN NOT FIND SNEAKER');
         res.redirect("/")
        }
       else {
         console.log(sneakershow)
      res.redirect("/" + sneakershow.Brand + "/" + sneakershow._id  + "/detail")
      }
  })
});



  


  


    


  module.exports = router 