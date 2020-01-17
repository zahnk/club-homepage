const express = require('express');
const router  = express.Router();
const Event = require('../models/event');



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

/*router.get("/private/userStartSeite", (req, res, next) => {
    let user=req.session.currentUser
    res.render("private/userStartSeite", {user: user});
});*/

router.get("/private/events", (req, res, next) => {
    Event.find()
    .then (allEvents => {
        //console.log (allEvents);
        const options = { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        };

        const formattedEvents = allEvents.map(event => {
        event.formattedDate = new Date(event.date).toLocaleDateString('de-DE',{ 
           day: 'numeric',  month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'
        }) + ' Uhr';
        return event;
        })
        res.render("private/events", {allEvents:formattedEvents});    
    })
    .catch(error => {
        next(error);
    })
});

router.post("/events", (req, res, next) => {
    
    const name = req.body.name;
    const date = req.body.date;
    const description = req.body.description;
    const place = req.body.place;
    const art = req.body.art

    /*if (email === "" || password === "") {
        res.render("events", {
            errorMessage: "Please enter both, email and password to sign in."
        });
        return;
    }
*/

Event.findOne({  "name": name, "date": date, "place": place  })
        .then(data => {
            if (data !== null) {
                res.render("private/events", {
                    errorMessage: "The event already exists!"
                });
                return;
            }
            Event.create({
                name,
                date,
                description,
                place,
                art
            })
                .then(() => {
                    res.redirect("/");
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