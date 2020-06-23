const express = require("express");
const bodyParser = require('body-parser')
//passport ID
const passport = require("passport")
const passportLocal = require("passport-local")
const bcrypt = require('bcryptjs')

const session = require("express-session")
const flash = require("connect-flash")
const methodOverride = require("method-override")
let sneaker = require("./model/sneaker")
let User = require("./model/db");
let user = require('./user');
let Sneaker = require("./admin")

const multer = require('multer');
const path =require("path")
const fs = require("fs")

let app = express()

var port = process.env.PORT || 3000

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(methodOverride("_method"))
passport.use('local', new passportLocal(User.authenticate()));
passport.serializeUser(function(user, done) { 
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    if(user!=null)
      done(null,user);
      
  });


app.use("*",function(req , res , next){
    res.locals.user = req.user || null
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    res.locals.Sneaker = req.Sneaker
    res.locals.moment = require('moment')
    next()


})
app.use('/', user);
app.use('/', Sneaker);
app.set("view engine","ejs");


app.use(express.static(__dirname + '/public'));
app.set('views',[path.join(__dirname,"views"),
                 path.join(__dirname,"views/routes") ]);




                 function enSureAuthenticated(req,res,next){
                    if(req.isAuthenticated()){
                          return next();
                      }else{
                        req.flash('error', 'You need to login first');
                        res.redirect("/login")
                        
                  }
                  }




app.get("/adidas/:id/detail",function(req,res){
    sneaker.findById({_id:req.params.id},function(err,adidasdetail){
        if(err){
            console.log("error")
        }else{
         res.render("adidasdetail",{adidasdetail:adidasdetail});
        }
    })
 
});     


app.get("/nike/:id/detail",function(req,res){
    sneaker.findById({_id:req.params.id},function(err,nikedetail){
        if(err){
            console.log("error")
        }else{
         res.render("nikedetail",{nikedetail:nikedetail});
        }
    }
    )
}); 




//Comment

// app.get("/nike/:id/detail",function(req,res){
//     sneaker.findById({_id:req.params.id}).populate("users").exec(function(err,nikedetail){
//         if(err){
//             console.log("error")
//         }else{
//          res.render("nikedetail",{nikedetail:nikedetail});
//         }
//     }
//     )
// });     

// app.post("/nike/:id/detail",enSureAuthenticated,function(req,res){
//     sneaker.findById({_id:req.params.id},function(err,nikedetail){
//         if(err){
//             console.log(err)
//         }else{
//             User.findById({_id:req.user._id},function(err,find){
//                 if(err){
//                     console.log(err)
//                 }else{
//                     User.update({_id:req.user._id},{$set :{comment : req.body.comment}},function(err,update){
//                         if(err){
//                             console.log(err)
//                         }else{
//                             nikedetail.users.push(find)
//                             nikedetail.save()
//                             res.redirect("/nike/" + nikedetail._id + "/detail")
//                         }
//                     })
//                 }
//             })
          
//         }
//     }
//     )
// });     

app.get("/jordan/:id/detail",function(req,res){
    sneaker.findById({_id:req.params.id},function(err,jordandetail){
        if(err){
            console.log("error")
        }else{
         res.render("jordandetail",{jordandetail:jordandetail});
        }
    })
 
});     

    // app.get("/add",function(req,res){
    //     res.render("add");
    // });





// app.get("/adidas/details/checkbil",function(req,res){
//     res.render("checkbil");
// });  


// app.get("/jordan/details/checkbil",function(req,res){
//     res.render("checkbil");
// });  

// app.get("/profile",function(req,res){
//     res.render("profile");
// });
// app.get("/profile2",function(req,res){
//     res.render("profile2");
// });    




// let lolskin = [
//         {name: "Sejuani",imgurl:"https://vignette.wikia.nocookie.net/leagueoflegends/images/3/32/Sejuani_HextechSkin.jpg/revision/latest?cb=20200219200507"},
//         {name: "Ekko",imgurl:"https://vignette.wikia.nocookie.net/leagueoflegends/images/c/c8/Ekko_TrueDamageSkin.jpg/revision/latest?cb=20191030033742"},
//         {name: "Thresh",imgurl:"https://vignette.wikia.nocookie.net/leagueoflegends/images/c/c4/Thresh_DarkStarSkin.jpg/revision/latest?cb=20181021072919"},
//         {name: "Annie",imgurl:"https://vignette.wikia.nocookie.net/leagueoflegends/images/e/e6/Annie_Annie-VersarySkin.jpg/revision/latest?cb=20191017202438"},
//         {name: "Warwick",imgurl:"https://vignette.wikia.nocookie.net/leagueoflegends/images/2/22/Warwick_UrfwickSkin.jpg/revision/latest?cb=20181021045405"},
//         {name: "Miss Fortune",imgurl:"https://vignette.wikia.nocookie.net/leagueoflegends/images/d/dc/Miss_Fortune_PrestigeBewitchingSkin.jpg/revision/latest?cb=20191010151648"},
//         {name: "Yuumi",imgurl:"https://vignette.wikia.nocookie.net/leagueoflegends/images/3/33/Yuumi_HeartseekerSkin.jpg/revision/latest?cb=20200123005349"},
//         {name: "Garen",imgurl:"https://vignette.wikia.nocookie.net/leagueoflegends/images/2/25/Garen_MechaKingdomsSkin.jpg/revision/latest?cb=20191212013930"},
//         {name: "Lux",imgurl:"https://vignette.wikia.nocookie.net/leagueoflegends/images/2/25/Lux_ElementalistSkin.jpg/revision/latest?cb=20181021021002"},
//         {name: "Anivia",imgurl:"https://vignette.wikia.nocookie.net/leagueoflegends/images/1/15/Anivia_PapercraftSkin.jpg/revision/latest?cb=20190208202530"},
//       ];





// app.get("/signup",function(req,res){
//     res.render("signup");
// });

app.get("/contact",function(req,res){
    res.render("contact");
});

app.listen(port, function(req,res){
    console.log("Started Now!!");
});





// User 
