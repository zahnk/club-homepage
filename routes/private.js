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




router.post("/private/members_adm", (req, res, next) => {
  const email = req.body.email;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const memberrole = req.body.memberrole;
  const rolesince = req.body.rolesince;
  const age = req.body.age;
  //const imageUrl = req.body.imgUrl;
  const owner = req.session.currentUser._id;
  
  console.log("nach post in members_adm");
  
Member.findOne({"email": email})
        .then(data => {
            if (data !== null) {
                res.render("private/members_adm", {
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
                    res.redirect("/private");
                })
                .catch(error => {
                    console.log(error);
                })
        })
        .catch(error => {
            next(error);
        })
}); 



module.exports = router;