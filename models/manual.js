const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const manualSchema = new Schema({
    title: String,
    description: String,
    ingredients: String,
    tools: String, 
    duration: Number,
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    level:{
        type: String,
        enum:["Anfänger", "Fortgeschrittener", "Profi"],
      },
    category:{
        type: String,
        enum: ["Pflanzenschnitt", "Saat und Pflanzen", "Verarbeitung", "Bäume und Sträucher", "Schädlingsbekämpfung", "Sonstiges"]
      },
    links: []
    }, 
{
    timestamps: true
});

const Manual = mongoose.model("Event", manualSchema);

module.exports = Manual;