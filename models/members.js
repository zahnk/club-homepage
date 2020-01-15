const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    firstname: String,
    lastname: String,
    role: String,
    rolesince: Date,
    email: String,
    age: Number,
    imageUrl: String 
}, {
    timestamps: true
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;