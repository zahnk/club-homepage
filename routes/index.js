const express = require('express');
const router  = express.Router();

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


  router.get("/gallery", (req,res,next)=>{
    res.render("gallery")
    })

module.exports = router;
