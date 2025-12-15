import { auth } from "../../firebase"; 

async function getToken() {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  return await user.getIdToken();
}

export async function fetchTodos() {
  const token = await getToken();
  const res = await fetch("http://localhost:8000/tasks/todos/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
}

export async function addTodo(text) {
  const token = await getToken();
  const res = await fetch("http://localhost:8000/tasks/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });
  return await res.json();
}

export async function deleteTodo(id) {
  const token = await getToken();
  await fetch(`http://localhost:8000/tasks/todos/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function toggleComplete(id, completed) {
  const token = await getToken();
  const res = await fetch(`http://localhost:8000/tasks/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ completed }),
  });
  return await res.json();
}
