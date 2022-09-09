import React, { useState } from 'react';

import './NewTaskForm.css';

const NewTaskForm = ({ todo, setTodo }) => {
  const [label, setLabel] = useState('');
  const [labelMin, setLabelMin] = useState('');
  const [labelSec, setLabelSec] = useState('');

  function onLabelChange(e) {
    setLabel(e.target.value);
  }

  function onLabelMinChange(e) {
    if (e.target.value !== 'e') {
      setLabelMin(+e.target.value);
    }
  }

  function onLabelSecChange(e) {
    if (e.target.value !== 'e') {
      setLabelSec(+e.target.value);
    }
  }

  const uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  function createTodoItem(label, allTime) {
    return {
      label,
      id: uid(),
      edit: false,
      completed: false,
      time: new Date(),
      startTime: allTime,
      allTime,
      timerActive: false,
    };
  }

  function addItem(text, allTime) {
    const newItem = createTodoItem(text, allTime);
    const newArr = [...todo, newItem];

    setTodo(newArr);
  }

  function onKeyDown(e) {
    const second = labelSec;
    const minute = labelMin;

    if (e.key === 'Enter' && label.trim() && labelMin && labelSec) {
      addItem(label, minute * 60 + second);
      setLabel('');
      setLabelMin('');
      setLabelSec('');
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={onLabelChange}
        onKeyDown={onKeyDown}
        value={label}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={onLabelMinChange}
        value={labelMin}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={onLabelSecChange}
        value={labelSec}
      />
    </header>
  );
};

export default NewTaskForm;
