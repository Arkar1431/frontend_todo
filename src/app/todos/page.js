'use client'; // <-- Add this line at the top

import { useEffect, useState } from 'react';
import TodoItem from '../../components/TodoItem';
import SearchBar from '../../components/Searchbar';

export default function TodosPage() {
  const [todos, setTodos] = useState([]); // Initialize as an empty array

  useEffect(() => {
    async function fetchTodos() {
      try {
        const res = await fetch('/api/todos');
        const data = await res.json();
        
        // Ensure the fetched data is an array
        if (Array.isArray(data)) {
          setTodos(data);
        } else {
          console.error('Fetched data is not an array', data);
        }
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    }

    fetchTodos();
  }, []);

  return (
    <div>
      <SearchBar />
      <h1>Todo List</h1>
      <ul>
        {Array.isArray(todos) && todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))
        ) : (
          <p>No todos available</p> // Show message if no todos
        )}
      </ul>
    </div>
  );
}
