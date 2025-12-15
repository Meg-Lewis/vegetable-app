import { useEffect, useState } from "react";
import { fetchTodos, addTodo, deleteTodo, toggleComplete } from "./todoApi";
import Heading from "../Heading";
import InputField from "../InputField";
import Button from "../Button";
import Flex from "../Flexbox";
import { CirclePlus, X } from "lucide-react";
import "../../styles/index.css"; 



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
      <Heading level={3} alignText = "left" >My Tasks</Heading>
      <form onSubmit={handleAdd}>
      <Flex direction="row" gap="1.5rem" align="center" justify="space-between" margin="0 0 1.5rem 0">
        <InputField placeholder="Add new task" value={text} onChange={(e) => setText(e.target.value)} onEnter={handleAdd} />
        <Button type="submit" variant="icon"><CirclePlus size={28} color="#bfd35a" /></Button>
      </Flex>
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
              className="checkbox"
            />
            <span style={{ flex: 1 }}>{item.text}</span>
            <Button onClick={() => handleDelete(item.id)} variant="icon"><X size={22} color="black" /></Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
