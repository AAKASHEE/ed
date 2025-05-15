import { useState } from 'react';
import { CheckCircle, Circle, Trash2, Plus } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Submit Java assignment', completed: false },
    { id: '2', text: 'Prepare for Machine Learning exam', completed: false },
    { id: '3', text: 'Attend Data Structures workshop', completed: true },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (!newTodo.trim()) return;
    
    const todo = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
    };
    
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="card animate-fade-in">
      <h2 className="text-xl font-bold text-gray-800 mb-4">To-Do List</h2>
      
      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="input flex-1"
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button
          onClick={addTodo}
          className="ml-2 bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition"
        >
          <Plus size={20} />
        </button>
      </div>
      
      <ul className="space-y-2">
        {todos.length === 0 ? (
          <li className="text-gray-500 text-center py-4">No tasks yet. Add one above!</li>
        ) : (
          todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between p-3 rounded-md transition-colors ${
                todo.completed ? 'bg-gray-50' : 'bg-white'
              } border border-gray-100 hover:border-gray-200`}
            >
              <div className="flex items-center">
                <button onClick={() => toggleTodo(todo.id)} className="mr-3">
                  {todo.completed ? (
                    <CheckCircle size={20} className="text-green-500" />
                  ) : (
                    <Circle size={20} className="text-gray-400" />
                  )}
                </button>
                <span className={todo.completed ? 'line-through text-gray-500' : 'text-gray-700'}>
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoList;