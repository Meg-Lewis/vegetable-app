import { useEffect, useState } from "react";
import { fetchTodos, addTodo, deleteTodo, toggleComplete } from "./todoApi";

export default function TodoList() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    const data = await fetchTodos();
    console.log("fetchTodos returned:", data, Array.isArray(data));
    setItems(data);
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!text.trim()) return;
    await addTodo(text);
    setText("");
    loadTodos();
  }

  async function handleDelete(id) {
    await deleteTodo(id);
    loadTodos();
  }

  async function handleToggle(item) {
    await toggleComplete(item.id, !item.completed);
    loadTodos();
  }

  return (
    <div style={{ maxWidth: 500, margin: "0 auto" }}>
      <h2>My To-Do List</h2>

      <form onSubmit={handleAdd} style={{ display: "flex", marginBottom: 20 }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add new task"
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit" style={{ marginLeft: 8 }}>Add</button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 10,
              textDecoration: item.completed ? "line-through" : "none",
            }}
          >
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggle(item)}
              style={{ marginRight: 10 }}
            />
            <span style={{ flex: 1 }}>{item.text}</span>
            <button onClick={() => handleDelete(item.id)} style={{ marginLeft: 10 }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
