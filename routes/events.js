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

router.get("/private/events", (req, res, next) => {
  res.render("private/events");
});


module.exports = router;