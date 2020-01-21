const express = require('express');
const router  = express.Router();
const Member = require('../models/members');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


//Seite zu Über uns entspricht dem Impressum
router.get("/aboutUs", (req,res,next)=>{
  let user=req.session.currentUser
res.render("aboutUs" , {user:user})
})

//Hier wird eine Liste von Links für alle öffentlich angezeigt
router.get("/links", (req,res,next)=>{
  let user=req.session.currentUser
  res.render("links", {user: user})
  })

//Hier wird die Bildergalerie für alle öffentlich angezeigt
router.get("/gallery", (req,res,next)=>{
  let user=req.session.currentUser
  res.render("gallery", {user: user})
  })

//Hier werden die Vereinsmitglieder für alle öffentlich angezeigt  
router.get('/members', (req, res, next) => {
  let user=req.session.currentUser
    Member.find()
        .then(AllMembers => {
          console.log("jetzt werden Vereinsmitglieder gesucht"); 
          res.render('members', {AllMembers, user: user});
        })
        .catch(error => {
            console.log(error);
        })
});  

module.exports = router;
