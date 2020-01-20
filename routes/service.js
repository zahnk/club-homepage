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

//Löschen von Anleitungen über die Adminseite
router.get("/private/serviceDelete", (req, res, next) => {
    Manual.find().populate("owner")
    .then(allManuals=>{
        console.log(allManuals)
        res.render("private/serviceDelete", {allManuals})
    })
 });

//post Method zum erstellen neuer Anleitungen
router.post("/private/service/serviceformular", (req, res,next)=>{
    const{title, description, duration, links, tools, ingredients, level, category} = req.body
    const owner= req.session.currentUser._id
    console.log(category)
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
         res.redirect(`/private/service/${category}`)
    })
})


//Ansicht aller Anleitungen
router.get("/private/service/:category", (req,res,next)=>{
    let category=req.params.category
    
Manual.find({category: category}).sort({level: 1})
    .then(allManuals=>{
        
        res.render("private/serviceDetails.hbs", {allManuals: allManuals})
            })
    .catch(err=>console.log(err))
})


//Anzeige des Satzes zum editieren
router.get("/private/service/:id/edit", (req,res,next)=>{
   const{title, duration, description, tools, ingredients, level, category}=req.body 
  Manual.findOne({_id: req.params.id})
 .then(oneManual=>{
       if(oneManual.owner==req.session.currentUser._id){
          res.render("private/serviceEdit", {oneManual})
      }
      else{
          res.redirect(`/private/service/${oneManual.category}`)
          
      }
 })
 .catch(err=>console.log(err))

})

router.post("/private/service/serviceformular/:id", (req, res,next)=>{
    const{title, duration, description, tools, ingredients, level, category}=req.body 
    Manual.findByIdAndUpdate(req.params.id,{title, duration, description, tools, ingredients, level, category})
    .then(oneManual=>{
        
        res.redirect(`/private/service/${category}`)
    })
    .catch(err=>console.log(err))
})

router.get("/private/serviceDelete/:id", (req,res,next)=>{
    Manual.findByIdAndDelete({_id: req.params.id})
    .then(oneManual=>{
        res.redirect("/private/serviceDelete")
    })
    .catch(err=>console.log(err))
})

module.exports = router;