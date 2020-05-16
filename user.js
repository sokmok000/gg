const express = require("express");
var router = express.Router();
const {check,validationResult}= require("express-validator")
// import form DB
let User = require("./model/db")

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
 
  
  module.exports = router;