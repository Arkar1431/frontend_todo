import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BASE_URL; 

// Function to handle GET request
export async function GET() {
  try {
    const response = await axios.get(API_URL);  // Fetch all todos from Spring backend
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return new Response('Error fetching todos', {
      status: 500
    });
  }
}

// Function to handle POST request
export async function POST(request) {
  try {
    const todoData = await request.json();  // Extract todo data from the request body
    const response = await axios.post(API_URL, todoData);  // Send new todo to Spring backend
    return new Response(JSON.stringify(response.data), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error adding todo:", error);
    return new Response('Error adding todo', {
      status: 500
    });
  }
}

// Function to handle DELETE request
export async function DELETE(request) {
  const { id } = request.params;  // Get todo ID from request parameters
  try {
    await axios.delete(`${API_URL}/${id}`);  // Delete the todo by ID from Spring backend
    return new Response('Todo deleted successfully', {
      status: 200
    });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return new Response('Error deleting todo', {
      status: 500
    });
  }
}
