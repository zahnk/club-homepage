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
    res.render("private/userStartSeite");
});

router.get("/private/admin", (req, res, next) => {
    res.render("private/admin");
});

router.get("/private/events", (req, res, next) => {
    res.render("private/events");
});

router.get("/private/service", (req, res, next) => {
    res.render("private/service");
});



module.exports = router;