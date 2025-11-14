import { useEffect, useRef, useState } from "react";
import "./App.css";

//CRUD

//Create - POST
//Read - GET
//Update - PUT/PATCH
// Delete - DELETE

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
    inputRef.current.value = "";
  }

  async function handleDelete(id) {
    console.log("handle delete");
    try {
      const response = await fetch(`http://localhost:8080/todos/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      console.log(result)
      const newTodos = todos.filter((todo) => todo._id !== id);
      setTodos(newTodos);
    } catch (e) {
      console.log(e.message);
    }
  }

  async function handleUpdate(id) {
    try {
    const response = await fetch(`http://localhost:8080/todos/${id}`, {
      method: "PUT"
    })
    const result = await response.json()
    console.log(result)
     const updatedTodos = todos.map((todo) => (todo._id === id ? { ...todo, completed: !todo.completed } : todo))
    // const updatedTodos = todos.map((todo) => {
    //   if(todo._id === id) {
    //   return {...todo, completed: !todo.completed}
    //   }
    //   return todo
    // })
    setTodos(updatedTodos)
    } catch(e) {
       console.log(e.message);
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
              onChange={() => handleUpdate(todo._id)}
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
