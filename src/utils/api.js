export async function fetchTodos() {
    const res = await fetch('/api/todos');
    return res.json();
  }
  
  export async function createTodo(newTodo) {
    const res = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(newTodo),
      headers: { 'Content-Type': 'application/json' },
    });
    return res.json();
  }
  
  export async function deleteTodoById(id) {
    const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    return res.json();
  }
  