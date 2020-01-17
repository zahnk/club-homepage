const express = require('express');
const router  = express.Router();
const User = require('../models/users');
const Manual = require('../models/manual')



router.get("/", (req, res, next) => {
    res.render("/");
});

//access only if logged-in !!!
router.use((req, res, next) => {
    if (req.session.currentUser) {
        next();
    } else {
        res.redirect("/");
    }
});                              

router.get("/private/userStartSeite", (req, res, next) => {
    let user=req.session.currentUser
    res.render("private/userStartSeite", {user: user});
});


//Einstiegsseite für die Anleitungen
router.get("/private/service", (req, res, next) => {
  res.render("private/service");
});

//Hier fangen die Unterseiten an
router.get("/private/service/sonstiges", (req,res,next)=>{
Manual.find({category: "Sonstiges"})
.then(manual=>{
    res.render("private/service/sonstiges", {manual})})


})

router.get("/private/service/baeumeundstraeucher", (req,res,next)=>{
    Manual.find({category: "Bäume und Sträucher"})
    .then(manual=>{
        res.render("private/service/baeumeundstraeucher", {manual})
    })
  
  
  })

router.get("/private/service/pflanzenschnitt", (req,res,next)=>{
    
    Manual.find({category: "Pflanzenschnitt"}).sort({level: 1})
    .then(manual=>{
        res.render("private/service/pflanzenschnitt", {manual})
    })
 
})

//Filteroption nach Level
router.post("/private/service/filter", (req,res,next)=>{
    let level=req.body.filter
    console.log(level)
    Manual.find({category: "Pflanzenschnitt"} && {level})
    .then(manual=>{
        res.render("private/service/pflanzenschnitt", {manual})
    })
})


router.get("/private/service/saatundpflanzen", (req,res,next)=>{
    Manual.find({category: "Saat und Pflanzen"})
    .then(manual=>{
        res.render("private/service/saatundpflanzen",{manual})
    })
   
   
   })


router.get("/private/service/schaedlingsbekaempfung", (req,res,next)=>{
    Manual.find({category: "Schädlingsbekämpfung"})
    .then(manual=>{
        res.render("private/service/schaedlingsbekaempfung", {manual})
    })
    
    
    })

router.get("/private/service/verarbeitung", (req,res,next)=>{
    Manual.find({category: "Verarbeitung"})
    .then(manual=>{
        res.render("private/service/verarbeitung", {manual})
    })
  
  
  })

//Get route für das Formular zum erzeugen neuer Anleitungen
  router.get("/private/service/serviceformular", (req,res,next)=>{
    res.render("private/service/serviceformular")
    
    })

//post Method zum erstellen neuer Anleitungen
router.post("/private/service/serviceformular", (req, res,next)=>{
    const{title, description, duration, links, tools, ingredients, level, category} = req.body
    const owner= req.session.currentUser._id
    //console.log(title, description, duration, links, tools, ingredients, level, category, owner)
    Manual.create({
        title, 
        description, 
        duration, 
        links, 
        tools, 
        ingredients, 
        level, 
        category,
        owner
    })
    .then(manual=>{
         res.redirect("/private/service")
    })
})





module.exports = router;