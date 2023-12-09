import React, { useState } from 'react';
import {RiTodoLine} from 'react-icons/ri';

const App = () => {
  const [todo, setTodo] = useState([]);
  const [title, setTitle] = useState('');
  const [task, setTask] = useState('');
  const [status, setStatus] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const createTodo = () => {
    const newTodo = {
      id: Date.now(),
      title,
      task,
      status,
    };
    setTodo([newTodo, ...todo]);
    setTitle('');
    setTask('');
    setStatus('');
  };

  const deleteTodo = (id) => {
    const updatedTodo = todo.filter((todo) => todo.id !== id);
    setTodo(updatedTodo);
  };

  const updateTodo = (id) => {
    const todoToUpdate = todo.find((todo) => todo.id === id);
    if (todoToUpdate) {
      setTitle(todoToUpdate.title);
      setTask(todoToUpdate.task);
      setStatus(todoToUpdate.status);
      setEditMode(true);
      setEditId(id);
    }
  };

  const saveUpdate = () => {
    const updatedTodo = todo.map((todo) => {
      if (todo.id === editId) {
        return {
          ...todo,
          title,
          task,
          status,
        };
      }
      return todo;
    });
    setTodo(updatedTodo);
    setEditMode(false);
    setEditId(null);
    setTitle('');
    setTask('');
    setStatus('');
  };

  const clearTodo = () => {
    setTodo([]);
  };

  return (
    <>
    <div className="container mx-auto bg-blue p-4  w-[400px] border border-black rounded flex flex-col items-center">
      <div className='text-5xl'><RiTodoLine /></div>
      <div className="text-3xl font-bold mb-4">To-Do App</div>
      <div className="mb-4 w-60">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block mb-2 p-2 border border-black rounded w-full"
        />
        <textarea
          placeholder="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="block mb-2 p-2 border border-black rounded w-full"
        ></textarea>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="block mb-4 p-2 border border-black rounded w-full"
        >
          <option value="">Choose a Status</option>
          <option value="Not Started">Not Started</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Complete">Complete</option>
        </select>
        <button
          onClick={clearTodo}
          className="bg-white text-black px-4 py-2 border border-black rounded hover:bg-mint"
        >
          Clear
        </button>
        {editMode ? (
          <button
            onClick={saveUpdate}
            className="bg-white text-black px-4 py-2 ml-11 border border-black rounded hover:bg-mint"
          >
            Save Update
          </button>
        ) : (
          
          <button
            onClick={createTodo}
            className="bg-white text-black px-4 py-2 ml-[17%] border border-black rounded hover:bg-mint"
          >
            Create To-do
          </button>
        )}
      </div>
      <div className="todo-list w-64">
        {todo.map((todo) => (
          <div
            key={todo.id}
            className="todo-item bg-white p-4 mb-4 rounded border border-mint-300"
          >
            <h3 className="text-xl font-bold mb-2">{todo.title}</h3>
            <p className="mb-2">{todo.task}</p>
            <p className="mb-2">Status: {todo.status}</p>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="bg-white text-black border px-2 py-1 rounded mr-2 hover:bg-mint"
            >
              Delete
            </button>
            <button
              onClick={() => updateTodo(todo.id)}
              className="bg-white text-black px-2 py-1 rounded hover:underline"
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default App;
