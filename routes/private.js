const express = require('express');
const router  = express.Router();
const User = require('../models/users');



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

//Erfassung von Members
router.get("/private/adminMembers", (req, res, next) => {
    if(req.session.currentUser.userrole=="admin"){
        res.render("private/adminMembers");
    }
    else{
        res.redirect("/");
    }
    });

module.exports = router;