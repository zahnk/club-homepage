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