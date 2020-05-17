const express = require("express");
var router = express.Router();
const {check,validationResult}= require("express-validator");
let profile = require("./model/profile");
let User = require("./model/db");
let bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const passport = require("passport")
const passportLocal = require('passport-local');

const multer = require('multer');
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
  res.locals.currentUser = req.user || null
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  
  next();
})

let saveprofile = multer.diskStorage(
  {
  destination:function(req,file,cb){
    cb(null,"./public/images/img-profile/");
  },
  filename:function(req,file,cb){
   

    cb(null,file.originalname);
  }
})

let edit = multer({storage : saveprofile});



router.get('/', function(req, res, next) {
  res.render('home2');
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
  User.findById({_id:req.user._id},function(error,user){
    if(error){
      console.log(error)
    }else{
      console.log(user)
      res.render("profile2",{user:user});
    }
  })

  }  )




router.post("/login",passport.authenticate("local",{
          failureRedirect:"/login",
          successRedirect : "/profile",
          successFlash: true,            
         failureFlash: true,
          successFlash: "You log in successfully",
         failureFlash: "Invalid username or password "
}),
function(req , res){
})




router.post('/signup',function(req,res){
  User.register(new User({username:req.body.username,email:req.body.email,name :"?",Surename :"?",Housenumber:"?", Province:"?", District:"?", Postalcode:"?", IDCard :"?", Telephone:"?", Size :"?",Gender:"?", image:"?"
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
    




// router.post('/signup', [
//     check('email', 'กรุณาป้อน Email ให้ถูกต้อง').isEmail(),
//     check('name', 'กรุณาป้อน Username ').not().isEmpty(),
//     check('password', 'กรุณาป้อน Password').not().isEmpty()
//   ], function(req, res, next ) {
//     const result = validationResult(req);
//     let errors = result.errors;
//     //Validation Data
//     if (!result.isEmpty()) {
//       //Return error to views
//       res.render('signup2', {
//         errors: errors
//       })
//     } else{
//         //insert DB
//         let name = req.body.name;
//         let password = req.body.password;
       
//         let email = req.body.email;
//         let newUser = new User({
//           name:name,
//           password:password,
//           email:email
//         })
//         User.createUser(newUser,function(err,user){
//           if(err){
//             console.log(err)
//             req.flash('error','Username or Email had already used');
//             res.redirect('/signup')
//           }
//         });
//         req.flash("success","Register successfully , Please Login")
//         res.redirect("/login")
//       }
//       }
//     );




    router.get('/profile/:id/edit', function(req,res){
      User.findById({_id:req.user._id},function(err, edit){
          if(err){
              console.log("error");
          } else {
              res.render('edit',{edit:edit});
          }
      })
  });
  
  router.post('/profile/:id/edit',edit.single('image'),function(req,res){
    if(!req.file){
        console.log(req.file)
    let Name = req.body.Name
    let Surename = req.body.Surename
    let Housenumber = req.body.Housenumber
    let Province= req.body.Province
    let District= req.body.District
    let Postalcode= req.body.Postalcode
    let IDCard= req.body.IDCard
    let Telephone= req.body.Telephone
    let Size= req.body.Size
    let Gender= req.body.Gender
    let image= req.body.image
          
   
    User.updateMany({_id:req.user._id},{$set : {Username:Username,Surename:Surename,Housenumber:Housenumber,Province:Province
    ,District:District,Postalcode:Postalcode,IDCard:IDCard,Telephone:Telephone,Size:Size,Gender:Gender,image:image}} ,function(err, update){
        if(error){
            console.log(error);
        } else {
            res.redirect('/profile')
            }
        }
    );
}
if(req.file){
  let Name = req.body.Name;
  let Surename = req.body.Surename;
  let Housenumber = req.body.Housenumber
  let Province= req.body.Province
  let District= req.body.District
  let Postalcode= req.body.Postalcode
  let IDCard= req.body.IDCard
  let Telephone= req.body.Telephone
  let Size= req.body.Size
  let Gender= req.body.Gender
  let image= req.file.image
    User.updateMany({_id:req.user._id},{$set : {Name:Name,Surname:Surname,image:image,IDCard:IDCard,TelephoneNo:TelephoneNo
    ,DateofBirth:DateofBirth,Province:Province,District:District,SubDistrict:SubDistrict,Height:Height
,Weight:Weight,Gender:Gender,Nationality:Nationality,Religion:Religion,Address:Address,Country:Country,ZipCode:ZipCode}} ,function(err, update){
        if(error){
            console.log(error);
        } else {
            res.redirect('/profile')
            }
        }
    );
}
});
  
  module.exports = router;