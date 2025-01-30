'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/Searchbar';
import TodoForm from '@/components/TodoForm';
import TodoItem from '@/components/TodoItem';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // New state to hold search term

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('/api/todos');
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  // Function to add a new todo
  const addTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // Function to remove a todo by index
  const removeTodo = async (id) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }
  
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert("Error deleting todo. Please check your backend.");
    }
  };

  // Function to handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Filter todos by title based on search term
  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 pt-20">
      <Header />
      <h1 className="text-2xl font-bold text-center">To-Do List Project</h1>
      <SearchBar onSearch={handleSearch} />
      
      <div className="flex gap-10 mt-8">
        <div className="w-1/3 bg-gray-200 p-6 rounded-lg shadow-md">
          <TodoForm addTodo={addTodo} />
        </div>
        
        <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo, index) => (
              <TodoItem 
                key={index} 
                index={index} 
                todo={todo} 
                removeTodo={removeTodo} 
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No todos available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
