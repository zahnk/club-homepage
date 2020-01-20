const express = require('express');
const router  = express.Router();
const User = require('../models/users');
const Member = require('../models/members');



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
if(req.session.currentUser.userrole=="admin"){
    res.render("private/admin");
}
else{
    res.redirect("/");
}
});

//Erfassung von Events und Terminen
router.get("/private/adminEvents", (req, res, next) => {
    if(req.session.currentUser.userrole=="admin"){
        res.render("private/adminEvents");
    }
    else{
        res.redirect("/");
    }
    });

//Erfassung von Mitgliedern (Members)
router.get("/private/adminMembers", (req, res, next) => {
    if(req.session.currentUser.userrole=="admin"){
        res.render("private/adminMembers");
    }
    else{
        res.redirect("/");
    }
    });

router.post("/private/adminMembers", (req, res, next) => {
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
                    errorMessage: "Member already exists!"
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
    if(req.session.currentUser.userrole=="admin"){
        res.render("private/deleteMembers");
    }
    else{
        res.redirect("/");
    }
    });


    //Löschung von Services / Anleitungen
router.get("/private/serviceDelete", (req, res, next) => {
    if(req.session.currentUser.userrole=="admin"){
        res.render("private/serviceDelete");
    }
    else{
        res.redirect("/");
    }
    });


module.exports = router;