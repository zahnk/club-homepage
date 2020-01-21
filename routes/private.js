const express = require('express');
const router  = express.Router();
const User = require('../models/users');
const Member = require('../models/members');
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

//Nur wer eingelogged ist und Adminrechte hat, hat Zugriff auf die Adminseite
router.get("/private/admin", (req, res, next) => {
    let user=req.session.currentUser
    
if(req.session.currentUser.userrole=="admin"){
    res.render("private/admin", {user: user});
}
else{
    Manual.find({owner: user._id}).
    then(manuals=>{
        res.render("private/userSeite", {manuals,user: user});
    })
    
}
});

//route Useraccount
router.get("/private/userAccount", (req,res,next)=>{
    let user=req.session.currentUser;
    Manual.find({owner: user._id}).
    then(manuals=>{
        res.render("private/userSeite", {manuals,user: user});
    })
})

//zurück Route aus dem Useraccount
router.get("/private/abbrechen", (req,res,next)=>{
    
    if(req.session.currentUser.userrole=="admin"){
        res.redirect("/private/admin");
    }
    else{
       res.redirect("/private/userStartSeite");
        
    }
})

//Erfassung von Events und Terminen
router.get("/private/adminEvents", (req, res, next) => {
    let user=req.session.currentUser
    if(req.session.currentUser.userrole=="admin"){
        res.render("private/adminEvents", {user: user});
    }
    else{
        res.redirect("/");
    }
    });

//Erfassung von Mitgliedern (Members)
router.get("/private/adminMembers", (req, res, next) => {
    let user=req.session.currentUser
    if(req.session.currentUser.userrole=="admin"){
        res.render("private/adminMembers", {user: user});
    }
    else{
        res.redirect("/");
    }
    });

router.post("/private/adminMembers", (req, res, next) => {
    let user=req.session.currentUser
  const email = req.body.email;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const memberrole = req.body.memberrole;
  const rolesince = req.body.rolesince;
  const age = req.body.age;
  //const imageUrl = req.body.imgUrl;
  const owner = req.session.currentUser._id;
  
  //console.log("nach post in adminMembers");
  
Member.findOne({"email": email})
        .then(data => {
            if (data !== null) {
                res.render("private/adminMembers", {
                    errorMessage: "Member already exists!", user: user
                });
                return;
            }
            Member.create({
                email, 
                firstname,
                lastname,
                memberrole,
                rolesince,
                age
            })
                .then(() => {
                    res.redirect("/members");
                })
                .catch(error => {
                    console.log(error);
                })
        })
        .catch(error => {
            next(error);
        })
}); 

//Löschung von Mitgliedern (Members)
router.get("/private/deleteMembers", (req, res, next) => {
    let user=req.session.currentUser
    Member.find() 
        .then(AllMembers => {
            res.render("private/deleteMembers", {AllMembers, user: user})
        })
    });

router.get("/private/deleteMembers/:id", (req, res, next) => {
    Member.findByIdAndDelete(req.params.id) 
    .then(OneMember => {
        res.redirect("/private/deleteMembers")
    })
    .catch(error => {
        next(error);
    })   
});     

module.exports = router;