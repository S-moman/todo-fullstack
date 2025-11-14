import { useEffect, useRef, useState } from "react";
import "./App.css";

//CRUD

//Create - POST
//Read - GET
//Update -
// Delete


function App() {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    async function getTodos() {
      const response = await fetch("http://localhost:8080/todos");
      const data = await response.json();
      console.log(data);
      setTodos(data);
    }
    getTodos();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const todo = {
      text: inputRef.current.value,
    };
    try {
      const response = await fetch("http://localhost:8080/todos", {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newTodo = await response.json();
      console.log(newTodo);
      setTodos([...todos, newTodo]);
    } catch (e) {
      console.log(e.message);
    }
  }

  async function handleDelete(id) {
    console.log('handle delete')
    try {
    const response = await fetch(`http://localhost:8080/todos/${id}`)
    const result = response.json()
    } catch(e) {
      console.log(e.message)
    }
  }

  return (
    <>
      <h1>Todos</h1>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} required={true} />
        <button>Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => {}}
            />
            {todo.text}
            <button onClick={() => handleDelete(todo._id)}>x</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
