import { useState, useEffect } from 'react';
import './Todo.css';

export function Todos(props){
    return <div className="create.todo">
        {props.todos.map((todo)=> <Maketodo props={props} completed={todo.completed} key={todo._id} _id={todo._id} title={todo.title} description={todo.description} pinned={todo.pinned} /> )}
    </div>
}
function Maketodo({props,title,description,completed,_id,pinned}){
    if(pinned==false){
        return <div className="todo">
            <h2>Title : {title}</h2>
            <h4>Description : {description}</h4>
            <button  onClick={()=>{
            fetch("http://localhost:3000/completed",{
                method: "PUT",
                body: JSON.stringify({
                    id: _id
                }),
                headers:{
                    "Content-type": "application/json" 
                }
            })
            .then(async (res)=>{
                const json= await res.json();
                alert("todo updated");
                fetch("http://localhost:3000/todos")
                  .then(async function(res) {
                    const json = await res.json();
                    props.setTodos(json.todos);
                  })
                  .catch(error => {
                    console.error('Error fetching todos:', error);
                  });
            })
                // Fetch todos only once when the component mounts
                
        }}>{completed == true ? "Done":"Mark as Done"}</button>
        <button  onClick={() => {
            fetch("http://localhost:3000/delete",{
                method: "DELETE",
                body: JSON.stringify({
                    id: _id
                }),
                headers:{
                    "Content-type": "application/json" 
                }
            })
            .then(async (res)=>{
                const json= await res.json();
                alert("todo is Deleted");

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
        }}>Delete it</button>
        <button onClick={() => {
            fetch("http://localhost:3000/pinned",{
                method: "PUT",
                body: JSON.stringify({
                    id: _id
                }),
                headers:{
                    "Content-type": "application/json" 
                }
            })
            .then(async (res)=>{
                const json= await res.json();
                alert("todo is pinned");

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
        }} >pin</button>

        {/* <button onClick={h}>Update</button> */}

        </div>
        }
}