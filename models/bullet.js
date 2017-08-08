var mongoose = require("mongoose");

var bulletSchema = new mongoose.Schema({
    task: String,
    description: String,
    createdDate: {type: Date, default: Date.now},
    dueDate: Date,
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Note"
        }
    ]
});

module.exports = mongoose.model("Bullet", bulletSchema);