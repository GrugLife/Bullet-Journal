var mongoose = require("mongoose");

var bulletSchema = new mongoose.Schema({
    task: String,
    description: String,
    createdDate: {type: Date, default: Date.now},
    dueDate: Date,
    priority: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Note"
        }
    ],
    taskList: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "taskList"
        }
    ]
});

module.exports = mongoose.model("Bullet", bulletSchema);