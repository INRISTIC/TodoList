import React, { useState } from 'react';
import './App.css';

import { NewTaskForm } from '../NewTaskForm';
import { TaskList } from '../TaskList';
import { Footer } from '../Footer';
import { TaskFilter } from '../TaskFilter';

const App = () => {
  const [todo, setTodo] = useState([]);
  const [flag, setFlag] = useState('All');

  function clearCompletedItem() {
    setTodo(todo.filter((task) => !task.completed));
  }

  function getByFilter() {
    switch (flag) {
      case 'Completed':
        return todo.filter((element) => element.completed);
      case 'Active':
        return todo.filter((element) => !element.completed);
      default:
        return todo;
    }
  }

  const todos = getByFilter();
  const completedCount = todos.filter((element) => element.completed).length;
  const noCompletedCount = todos.length - completedCount;
  return (
    <section className="todoapp">
      <form className="new-todo-form">
        <NewTaskForm todo={todo} setTodo={setTodo} />
      </form>

      <section className="main">
        <TaskList todos={todos} todo={todo} setTodo={setTodo} />
        <footer className="footer">
          <Footer noCompletedCount={noCompletedCount} />
          <TaskFilter setFlag={setFlag} flag={flag} />
          <button type="button" className="clear-completed" onClick={clearCompletedItem}>
            Clear completed
          </button>
        </footer>
      </section>
    </section>
  );
};
export default App;
