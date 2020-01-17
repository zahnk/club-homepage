const express = require('express');
const router  = express.Router();
const Member = require('../models/members');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


//Seite zu Über uns entspricht dem Impressum
router.get("/aboutUs", (req,res,next)=>{
res.render("aboutUs")
})

//Hier wird eine Liste von Links für alle öffentlich angezeigt
router.get("/links", (req,res,next)=>{
  res.render("links")
  })

//Hier wird die Bildergalerie für alle öffentlich angezeigt
router.get("/gallery", (req,res,next)=>{
  res.render("gallery")
  })

//Hier werden die Vereinsmitglieder für alle öffentlich angezeigt  
router.get('/members', (req, res, next) => {
    Member.find()
        .then(AllMembers => {
          console.log("jetzt werden Vereinsmitglieder gesucht"); 
          res.render('members', {AllMembers});
        })
        .catch(error => {
            console.log(error);
        })
});  

module.exports = router;
