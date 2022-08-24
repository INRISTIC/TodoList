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
      this.createTodoItem('Active task'),
      this.createTodoItem('Completed task'),
      this.createTodoItem('Create task'),
    ],
    flag: 'All',
  };

  createTodoItem(label) {
    return {
      label,
      // eslint-disable-next-line no-plusplus
      id: this.maxId++,
      edit: false,
      completed: false,
      time: new Date(),
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

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
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
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            todos={todos}
            onDeleted={this.deleteItem}
            onEdit={this.editItem}
            onClickEdit={this.onClickEdit}
            onMarkImportant={this.onMarkImportant}
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
