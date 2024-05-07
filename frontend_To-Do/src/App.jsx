import { useState, useEffect } from 'react';
import { CreateTodo } from './components/CreateTodo';
import { Todos } from './components/Todos';
import './App.css';
import { Pinned } from './components/Pinned';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch todos only once when the component mounts
    fetch("http://localhost:3000/todos")
      .then(async function(res) {
        const json = await res.json();
        setTodos(json.todos);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
    }, []); // Empty dependency array ensures this effect runs only once

  return (
    <>
      <CreateTodo  todos={todos} setTodos={setTodos} />
      <Pinned todos={todos} setTodos={setTodos} ></Pinned>
      <Todos  todos={todos} setTodos={setTodos} />
    </>
  );
}

export default App;
