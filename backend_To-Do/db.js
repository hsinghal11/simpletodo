const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL);

const todoSchema = mongoose.Schema({
    title : String,
    description : String,
    completed : Boolean,
    pinned: Boolean
})
const todo = mongoose.model("todos",todoSchema);
module.exports= {
    todo
}