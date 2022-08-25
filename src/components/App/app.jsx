import React, { Component } from 'react';
import './app.css';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../footer';
import TaskFilter from '../TaskFilter';

export default class App extends Component {
  maxId = 100;

  // eslint-disable-next-line react/state-in-constructor
  state = {
    todoDate: [
      this.createTodoItem('Active task', 90),
      // this.createTodoItem('Completed task', 160),
      // this.createTodoItem('Create task', 310),
    ],
    flag: 'All',
  };

  createTodoItem(label, allTime) {
    return {
      label,
      // eslint-disable-next-line no-plusplus
      id: this.maxId++,
      edit: false,
      completed: false,
      time: new Date(),
      startTime: allTime,
      allTime,
      timerActive: true,
    };
  }

  // eslint-disable-next-line react/sort-comp
  deleteItem = (id) => {
    this.setState(({ todoDate }) => {
      const idx = todoDate.findIndex((el) => el.id === id);

      const newArray = [...todoDate.slice(0, idx), ...todoDate.slice(idx + 1)];

      return {
        todoDate: newArray,
      };
    });
  };

  editItem = (value, id) => {
    this.setState(({ todoDate }) => {
      const idx = todoDate.findIndex((el) => el.id === id);
      const oldItem = todoDate[idx];
      const newItem = { ...oldItem, label: value, edit: false };

      const newArray = [...todoDate.slice(0, idx), newItem, ...todoDate.slice(idx + 1)];

      return {
        todoDate: newArray,
      };
    });
  };

  addItem = (text, min, sec) => {
    const newItem = this.createTodoItem(text, min, sec);
    this.setState(({ todoDate }) => {
      const newArr = [...todoDate, newItem];
      return {
        todoDate: newArr,
      };
    });
  };

  // eslint-disable-next-line class-methods-use-this
  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onClickEdit = (id) => {
    this.setState(({ todoDate }) => {
      return {
        todoDate: this.toggleProperty(todoDate, id, 'edit'),
      };
    });
  };

  onClickPlay = (id) => {
    this.setState(({ todoDate }) => {
      const idx = todoDate.findIndex((el) => el.id === id);
      const oldItem = todoDate[idx];
      const newItem = { ...oldItem, timerActive: true };

      const newArray = [...todoDate.slice(0, idx), newItem, ...todoDate.slice(idx + 1)];

      return {
        todoDate: newArray,
      };
    });
  };

  onClickPaused = (id) => {
    this.setState(({ todoDate }) => {
      const idx = todoDate.findIndex((el) => el.id === id);
      const oldItem = todoDate[idx];
      const newItem = { ...oldItem, timerActive: false };

      const newArray = [...todoDate.slice(0, idx), newItem, ...todoDate.slice(idx + 1)];

      return {
        todoDate: newArray,
      };
    });
  };

  tick = (id) => {
    this.setState(({ todoDate }) => {
      const idx = todoDate.findIndex((el) => el.id === id);
      const oldItem = todoDate[idx];
      const count = oldItem.allTime;
      const newItem = { ...oldItem, allTime: count - 1 };
      const newArray = [...todoDate.slice(0, idx), newItem, ...todoDate.slice(idx + 1)];

      return {
        todoDate: newArray,
      };
    });
  };

  onMarkImportant = (id) => {
    this.setState(({ todoDate }) => {
      return {
        todoDate: this.toggleProperty(todoDate, id, 'completed'),
      };
    });
  };

  clearCompletedItem = () => {
    const { todoDate } = this.state;
    this.setState({
      todoDate: todoDate.filter((task) => !task.completed),
    });
  };

  getByFilter() {
    const { todoDate, flag } = this.state;
    switch (flag) {
      case 'Completed':
        return todoDate.filter((element) => element.completed);
      case 'Active':
        return todoDate.filter((element) => !element.completed);
      default:
        return todoDate;
    }
  }

  replayTime = (id, startTime) => {
    this.setState(({ todoDate }) => {
      const idx = todoDate.findIndex((el) => el.id === id);
      const oldItem = todoDate[idx];
      const newItem = { ...oldItem, allTime: startTime, timerActive: false };
      const newArray = [...todoDate.slice(0, idx), newItem, ...todoDate.slice(idx + 1)];

      return {
        todoDate: newArray,
      };
    });
  };

  onToggleFilter = (flag) => {
    this.setState({
      flag,
    });
  };

  render() {
    const todos = this.getByFilter();
    const { flag } = this.state;
    const completedCount = todos.filter((element) => element.completed).length;
    const noCompletedCount = todos.length - completedCount;
    return (
      <section className="todoapp">
        <form className="new-todo-form">
          <NewTaskForm onItemAdded={this.addItem} />
        </form>

        <section className="main">
          <TaskList
            todos={todos}
            onDeleted={this.deleteItem}
            onEdit={this.editItem}
            onClickEdit={this.onClickEdit}
            onMarkImportant={this.onMarkImportant}
            onClickPlay={this.onClickPlay}
            onClickPaused={this.onClickPaused}
            tick={this.tick}
            replayTime={this.replayTime}
          />
          <footer className="footer">
            <Footer noCompletedCount={noCompletedCount} />
            <TaskFilter onToggleFilter={this.onToggleFilter} flag={flag} />
            <button type="button" className="clear-completed" onClick={this.clearCompletedItem}>
              Clear completed
            </button>
          </footer>
        </section>
      </section>
    );
  }
}
