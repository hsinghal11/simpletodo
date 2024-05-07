import './Todo.css';

export function Pinned(props) {
    return (
        <div className="pinnedtodo">
        {props.todos.map((todo)=>{
            if(todo.pinned==true){
            return (
                    <div key={todo._id} className='todo'>
                        <h2>Title : {todo.title}</h2>
                        <h4>Description : {todo.description}</h4>
                        <button  onClick={()=>{
                fetch("http://localhost:3000/completed",{
                    method: "PUT",
                    body: JSON.stringify({
                        id: todo._id
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
                    
            }}>{todo.completed == true ? "Done":"Mark as Done"}</button>
            <button  onClick={() => {
                fetch("http://localhost:3000/delete",{
                    method: "DELETE",
                    body: JSON.stringify({
                        id: todo._id
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
                        id: todo._id
                    }),
                    headers:{
                        "Content-type": "application/json" 
                    }
                })
                .then(async (res)=>{
                    const json= await res.json();
                    alert("todo is Unpinned");

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
            }}  >Unpin</button>
                    </div>
                    )
                }})}
        </div>
    )
}