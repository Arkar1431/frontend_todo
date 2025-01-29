// /components/TodoForm.js
import React, { useState } from 'react';
import './style/FormCss.css';  // Correct way to import CSS file

const TodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(false);  // Default to false (Not Finished)

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!title.trim() || !description.trim()) {
      alert('Please fill out both title and description!');
      return;
    }
  
    const newTodo = {
      title,
      description,
      status,
    };
  
    try {
      const response = await fetch('/api/todos', {  // Use relative API path
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add todo");
      }
  
      const data = await response.json();
      addTodo(data);  // Update UI with new todo from backend
  
      // Reset form fields
      setTitle('');
      setDescription('');
      setStatus(false);
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("Error adding todo. Please check your backend.");
    }
  };
  
  

  return (
    <div className="todo-form-container">
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            required
          />
        </div>
        <div className="form-group">
          <label>Status: </label>
          <span>{status ? 'Finished' : 'Not Finished'}</span>
        </div>
        <button type="submit" className="submit-button">Add Todo</button>
      </form>
    </div>
  );
};

export default TodoForm;
