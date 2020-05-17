const express = require("express");
const bodyParser = require('body-parser')
//passport ID
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require('bcryptjs')
const path = require("path");
const session = require("express-session")
const flash = require("connect-flash")
let user = require('./user');
let app = express()



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
app.get("*",function(req , res , next){
    res.locals.user = req.user || null
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next()
})
app.use('/', user);
// app.use("/",route)
app.set("view engine","ejs");






// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));
app.set('views',[path.join(__dirname,"views"),
                 path.join(__dirname,"views/routes") ]);

app.get("/adidas/details",function(req,res){
    res.render("details2");
});     

app.get("/nike/details",function(req,res){
    res.render("details2");
});  

app.get("/jordan/details",function(req,res){
    res.render("details2");
});  

app.get("/add",function(req,res){
    res.render("add");
});

app.get("/edit",function(req,res){
    res.render("edit");
});  
app.get("/1",function(req,res){
    res.render("profile");
});  

app.get("/nike/details/checkbil",function(req,res){
    res.render("checkbil");
});  

app.get("/adidas/details/checkbil",function(req,res){
    res.render("checkbil");
});  


app.get("/jordan/details/checkbil",function(req,res){
    res.render("checkbil");
});  

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

app.get("/edit", function(req,res){
    res.render("edit");
});

app.get("/jordan", function(req,res){
    res.render("jordan");
});

app.get("/home2", function(req,res){
    res.render("home2");
});


app.get("/nike",function(req,res){
    res.render("nike");
});

// app.get("/signup",function(req,res){
//     res.render("signup");
// });

app.listen(3000, function(req,res){
    console.log("Started Now!!");
});

app.get("/adidas",function(req,res){
    res.render("adidas");
});



// User 
