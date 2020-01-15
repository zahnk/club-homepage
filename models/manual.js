const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const manualSchema = new Schema({
    title: String,
    description: String,
    ingredients: String,
    tools: String, 
    duration: Number,
    owner: {type: Schema.Types.ObjectId, ref: 'User'}
    }, 
{
    timestamps: true
});

const Manual = mongoose.model("Event", manualSchema);

module.exports = Manual;