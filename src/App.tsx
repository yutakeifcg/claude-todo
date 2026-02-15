import { useState } from 'react';
import type { FilterStatus, Todo } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generateId, filterTodos } from './utils/todoHelpers';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { FilterBar } from './components/FilterBar';
import './App.css';

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<FilterStatus>('all');

  const addTodo = (text: string) => {
    setTodos((prev) => [...prev, { id: generateId(), text, completed: false }]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const activeCount = todos.filter((t) => !t.completed).length;
  const filtered = filterTodos(todos, filter);

  return (
    <div className="app">
      <h1>Todos</h1>
      <div className="todo-container">
        <TodoInput onAdd={addTodo} />
        <TodoList todos={filtered} onToggle={toggleTodo} onDelete={deleteTodo} />
        {todos.length > 0 && (
          <FilterBar
            current={filter}
            onChange={setFilter}
            activeCount={activeCount}
          />
        )}
      </div>
    </div>
  );
}

export default App;
