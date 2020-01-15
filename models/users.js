const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    username: String,
    address: String,
    userrole:  { type: String, enum: ['admin', 'user'], default: 'user' }
}, 
{
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;