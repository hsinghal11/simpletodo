import React, { useState } from 'react';
import './CreateTodo.css'

export function CreateTodo(props) {
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");

    return(
        <div className="create-todo">
            <input type="text" placeholder="Title" onChange={(e)=>{
                setTitle(e.target.value)
            }} />
            <br /><br />
            <input type="text" placeholder="Description" onChange={(e)=>{
                setDescription(e.target.value)
            }}/>
            <br /><br />
            <button onClick={() => {
                fetch("http://localhost:3000/todo",{
                    method: "POST",
                    body: JSON.stringify({
                        title: title,
                        description: description
                    }),
                    headers:{
                        "Content-type": "application/json" 
                    }
                })
                .then(async (res)=>{
                    const json= await res.json();
                    alert("todo is added");

                    // Fetch todos when the button is clicked
                    fetch("http://localhost:3000/todos")
                      .then(async function(res) {
                        const json = await res.json();
                        props.setTodos(json.todos);
                      })
                      .catch(error => {
                        console.error('Error fetching todos:', error);
                      });
                })
            }}>Add a Todo</button>
            
        </div>
    )
}
