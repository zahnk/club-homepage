const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: String,
    description: String,
    date: Date,
    place: String,
    art: {
       type: String, 
       enum: ["intern", "Verarbeitung", "Pflanzen", "Sonstiges"]
    }
    }, 
{
    timestamps: true
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;