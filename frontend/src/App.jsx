import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([{ text: 'Lunch', completed: false, _id: 1 }]);

  useEffect(() => {
    async function getTodos() {
      const response = await fetch("http://localhost:8080/todos");
      const data = await response.json();
      console.log(data);
      // setTodos(data);
    }
    getTodos();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

  }

  return (
    <>
      <h1>Todos</h1>
      <form onSubmit={handleSubmit}>
        <input required={true} />
        <button>Add</button>
      </form>
      <ul>
        {todos.map((todo) => 
        <li key={todo._id}>
          <input type="checkbox" 
          checked={todo.completed}
          onChange={() => {}}
          />
          {todo.text}
        </li>
      )}
      </ul>
    </>
  );
}

export default App;
