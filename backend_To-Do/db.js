const mongoose = require("mongoose");
// mongodb+srv://himanshusinghal:himanshu2004@cluster0.ma30dxu.mongodb.net/
mongoose.connect("mongodb+srv://himanshusinghal:himanshu2004@cluster0.ma30dxu.mongodb.net/todos");
// mongoose.connect("mongodb+srv://himanshusinghal:himanshu2004@cluster0.ma30dxu.mongodb.net/todos", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 20000, // Increase the timeout to 20 seconds
//     socketTimeoutMS: 45000 // Increase the socket timeout to 45 seconds
// });
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