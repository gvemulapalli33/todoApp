const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    content: {type: String, lowercase: true},
    completed: Boolean
});

// compile model from schema
module.exports = mongoose.model("todo", TodoSchema);
