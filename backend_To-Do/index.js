const express= require("express");
const jwt=require("jsonwebtoken");
const { createTodo, updateTodo, deleteTodo } = require("./types");
const { todo } = require("./db");
const cors = require("cors");
const app=express();
require("dotenv").config();


app.use(express.json());
app.use(cors());
/* 
input expecting:
    body ={
        title : String
        description : String
    }
*/
app.post("/todo",async (req,res)=>{
    const createPayload=req.body;
    const parsedPayload=createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg: "you sent the Wrong inputs"
        })
        return;
    }
    // put it in mongodb
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false,
        pinned: false
    })
    res.json({
        msg: "Todo has been created"
    })
});

app.get("/todos",async (req,res)=>{
    // getting all todos from mongodb
    const todos = await todo.find({}); // it is a promise that site has to hit database thst can be anywhere therefor it will await
    res.json({
        todos
    })
})

app.put("/completed", async (req, res) => {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        });
        return;
    }

    try {
        const existingTodo = await todo.findOne({ _id: updatePayload.id });
        // console.log(existingTodo);
        if(existingTodo.completed==true){
            var updatedTodo = await todo.updateOne(
                { _id: updatePayload.id },
                { completed: false },
                // { new : true } // to return the updated document
            );
        }else{
            var updatedTodo = await todo.updateOne(
                { _id: updatePayload.id },
                { completed: true },
                // { new : true } // to return the updated document
            );
        }
        

        if (!updatedTodo) {
            res.status(404).json({
                msg: "Todo not found",
            });
            return;
        }

        res.json({
            msg: "Todo marked as completed",
        });
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({
            msg: "Internal server error",
        });
    }
});

app.put("/pinned",async (req,res)=>{
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        });
        return;
    }

    try {
        const existingTodo = await todo.findOne({ _id: updatePayload.id });
        // console.log(existingTodo);
        if(existingTodo.pinned==true){
            var updatedTodo = await todo.updateOne(
                { _id: updatePayload.id },
                { pinned: false },
                // { new : true } // to return the updated document
            );
        }else{
            var updatedTodo = await todo.updateOne(
                { _id: updatePayload.id },
                { pinned: true },
                // { new : true } // to return the updated document
            );
        }
        

        if (!updatedTodo) {
            res.status(404).json({
                msg: "Todo not found",
            });
            return;
        }

        res.json({
            msg: "Todo marked as pinned",
        });
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({
            msg: "Internal server error",
        });
    }
})


app.delete("/delete",async (req,res)=>{
    const deletepayload= req.body;
    const parsedPayload = deleteTodo.safeParse(deletepayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg: "You sent the wrong inputs"
        })
        return;
    }

    try {
        const deleted=await todo.deleteOne({_id:deletepayload.id})
        if(deleted){
            res.json({
                msg:"this Query is deleted"
            })
        }
    } catch (error) {
        console.log(error);
    }
})

const port = process.env.PORT || 3000 ;
app.listen(port,()=>{
    console.log("listen");
    
});