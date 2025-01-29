const TodoItem = ({ todo, index, removeTodo }) => {
  const { title, description, completed } = todo;

  return (
    <div className="todo-item p-4 mb-4 bg-gray-100 rounded shadow-sm">
      <h3 className="text-lg font-semibold text-black">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <span className={`status text-sm ${completed ? 'text-green-500' : 'text-red-500'}`}>
        {completed ? 'Finished' : 'Not Finished'}
      </span>
      <button
        onClick={() => removeTodo(id)}  // Use index instead of id
        className="bg-red-500 text-white px-4 py-2 mt-2 rounded"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
