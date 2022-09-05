import React, { useState } from 'react';
import './app.css';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../footer';
import TaskFilter from '../TaskFilter';

const App = () => {
  // eslint-disable-next-line no-use-before-define
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
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <NewTaskForm todo={todo} setTodo={setTodo} />
      </form>

      <section className="main">
        <TaskList todos={todos} todo={todo} setTodo={setTodo} />
        <footer className="footer">
          <Footer noCompletedCount={noCompletedCount} />
          {/* eslint-disable-next-line react/jsx-no-bind */}
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
