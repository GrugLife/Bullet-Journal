var mongoose = require("mongoose");

var taskSchema = mongoose.Schema({
    task: String,
    dateCreated: {type: Date, default: Date.now},
    completed: {type: Boolean, default: false},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Task", taskSchema);