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
  res.render('home');
});
function enSureAuthenticated(req,res,next){
  if(req.isAuthenticated()){
        return next();
    }else{
          res.render("login")
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
  res.redirect('/');
});
router.get("/profile",enSureAuthenticated,function(req , res, next ){
  res.render("profile");
})




router.post("/login",passport.authenticate("local",{
          failureRedirect:"/login",
          failureFlash:false
}),
function(req , res){
  res.redirect("/")
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
    // check('confirm', 'กรุณาป้อน Password ให้เหมือนกัน').not().isEmpty()
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
      // let confirm = req.body.confirm;
      let email = req.body.email;
      let newUser = new User({
        name:name,
        password:password,
        // confirm:confirm,
        email:email
      })
      User.createUser(newUser,function(err,user){
        if(err) throw err
        
      });
      res.redirect("/login")
    }
    }
  );









module.exports = router;