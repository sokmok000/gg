const express = require("express");
var router = express.Router();
const {check,validationResult}= require("express-validator")
// import form DB
let User = require("./model/db")
let profile = require("./model/profile")
let bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
//passport ID
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy


let app = express()

app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())






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
router.get("/profile",enSureAuthenticated,function(req , res, next ){
//   User.findById({_id:req.user._id}),function(user,error){
//     if(error){
//       console.log("error")
//     }else{
//       res.render("profile",{user:user});
//     }
//   }
// })
res.render("profile")
})
// router.get('/profile/new', function(req,res){
//   User.findById({_id:req.user._id},function(create,error){
//        if(error){
//            console.log("Error!");
//        } else {
//            res.render('updatecomprofile',{usercreate:create});
//        }
//    })
// });




router.post("/login",passport.authenticate("local",{
          failureRedirect:"/login",
          successFlash: true,            
         failureFlash: true,
          successFlash: "You log in successfully",
         failureFlash: "Invalid username or password "
}),
function(req , res){
  res.redirect("/profile")
})
passport.serializeUser(function(user,done){
  done(null,user.id)
})
passport.deserializeUser(function(id,done){
  User.getUserById(id,function(err,user){
    done(err,user);
  })
})

passport.use(new LocalStrategy(function(username,password,done){
          User.getUserByName(username,function(err,user){
            if(err) throw console.error();
            
            if(!user){
              return done(null,false)
            }else{
              return done(null,user)
            }

          User.comparePassword(password,user.password,function(err,ismatch){
                if(err) throw error
                if(ismatch){
                  return done(null,user)
                }else{
                  return done(null,false)
                }
              })
            }
          )
}))




router.post('/signup', [
    check('email', 'กรุณาป้อน Email ให้ถูกต้อง').isEmail(),
    check('name', 'กรุณาป้อน Username ').not().isEmpty(),
    check('password', 'กรุณาป้อน Password').not().isEmpty(),
  ], function(req, res, ) {
    const result = validationResult(req);
    var errors = result.errors;
    //Validation Data
    if (!result.isEmpty()) {
      //Return error to views
      res.render('signup2', {
        errors: errors
      })
    } else{
        //insert DB
        let name = req.body.name;
        let password = req.body.password;
       
        let email = req.body.email;
        let newUser = new User({
          name:name,
          password:password,
          email:email
        })
        User.createUser(newUser,function(err,user){
          if(err) throw err
          
        });
        req.flash("success","Register successfully , Please Login")
        res.redirect("/login")
      }
      }
    );

  
    router.get('/profile/:id/edit', function(req,res){
      profile.findById({_id:req.user._id},function(err,edit){
          if(err){
              console.log("error");
          } else {
              res.render('edit',{edit:edit});
          }
      })
  });
//   router.post('/profile/:id/edit',edit.single('image'),function(req,res){
//     if(!req.file){
//         console.log(req.file)
//     let username = req.body.username;
//     let TelephoneNo = req.body.tel;
//     let Province  = req.body.Province;
//     let District = req.body.District;
//     let Gender = req.body.Gender;
//     let Nationality = req.body.Nationality;
//     let Religion = req.body.Religion;
//     let Address = req.body.Address;
//     let Country = req.body.Country;
//     let ZipCode = req.body.ZipCode;
   
//     jobseekersignup.updateMany({_id:req.user._id},{$set : {Name:Name,Surname:Surname,IDCard:IDCard,TelephoneNo:TelephoneNo
//     ,DateofBirth:DateofBirth,Province:Province,District:District,SubDistrict:SubDistrict,Height:Height
// ,Weight:Weight,Gender:Gender,Nationality:Nationality,Religion:Religion,Address:Address,Country:Country,ZipCode:ZipCode}} ,function(error, idCard){
//         if(error){
//             console.log(error);
//         } else {
//             res.redirect('/jobseeker/profile')
//             }
//         }
//     );
// }
// if(req.file){
//     let Name = req.body.Name;
//     let Surname = req.body.Surname ;
//     let IDCard = req.body.IDCard;
//     let TelephoneNo = req.body.tel;
//     let DateofBirth = req.body.DateofBirth;
//     let Province  = req.body.Province;
//     let District = req.body.District;
//     let SubDistrict = req.body.SubDistrict;
//     let Height = req.body.Height;
//     let Weight = req.body.Weight;
//     let Gender = req.body.Gender;
//     let Nationality = req.body.Nationality;
//     let Religion = req.body.Religion;
//     let Address = req.body.Address;
//     let Country = req.body.Country;
//     let ZipCode = req.body.ZipCode;
//     let image = req.file.filename;
//     jobseekersignup.updateMany({_id:req.user._id},{$set : {Name:Name,Surname:Surname,image:image,IDCard:IDCard,TelephoneNo:TelephoneNo
//     ,DateofBirth:DateofBirth,Province:Province,District:District,SubDistrict:SubDistrict,Height:Height
// ,Weight:Weight,Gender:Gender,Nationality:Nationality,Religion:Religion,Address:Address,Country:Country,ZipCode:ZipCode}} ,function(error, idCard){
//         if(error){
//             console.log(error);
//         } else {
//             res.redirect('/jobseeker/profile')
//             }
//         }
//     );
// }
// });
  
  module.exports = router;