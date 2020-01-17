const mongoose = require('mongoose');
const Member = require ('../models/members');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/club-homepage', {useNewUrlParser: true})

const Mitglieder = [
    {
      firstname: "Erika",
      lastname: "Mustermann",
      memberrole: "President",
      rolesince: "2020-01-08T12:03:27.487+00:00",
      email: "emustermann@web.de",
      age: 35,
      imageUrl: "https://www.123rf.com/photo_45789022_portrait-of-a-woman-with-a-smartphone.html?term=portraits&vti=m178tyo8caxuepedzz-1-1"     
      },
      {
      firstname: "Max",
      lastname: "Mustermann",
      memberrole: "Treasurer",
      rolesince: "2020-01-01T12:03:27.487+00:00",
      email: "mmustermann@web.de",
      age: 37,
      imageUrl: "https://www.123rf.com/photo_83142120_portrait-of-happy-mature-man-wearing-spectacles-and-looking-at-camera-outdoor-man-with-beard-and-gla.html?term=portraits&vti=m178tyo8caxuepedzz-1-6"  
      },
      {
      firstname: "Ben",
      lastname: "Mustermann",
      memberrole: "Boardmember",
      rolesince: "2019-01-08T12:03:27.487+00:00",
      email: "bmustermann@web.de",
      age: 30,
      imageUrl: "https://www.123rf.com/photo_52081414_young-man-smiling-hipster-boy-handsome-man-in-hat-brutal-bearded-boy-with-tattoo.html?term=portraits&vti=m178tyo8caxuepedzz-1-20"     
      }
];



Member.create(Mitglieder, (err) => {
    if (err) { throw(err)}
    console.log(`${Mitglieder.length} members created`)
    mongoose.connection.close();
});