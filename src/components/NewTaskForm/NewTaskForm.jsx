import React, { useState } from 'react';

const NewTaskForm = ({ todo, setTodo }) => {
  const [label, setLabel] = useState('');
  const [labelMin, setLabelMin] = useState('');
  const [labelSec, setLabelSec] = useState('');

  function onLabelChange(e) {
    setLabel(e.target.value);
  }

  function onLabelMinChange(e) {
    setLabelMin(+e.target.value);
  }

  function onLabelSecChange(e) {
    setLabelSec(+e.target.value);
  }

  // eslint-disable-next-line func-names
  const uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  // eslint-disable-next-line no-shadow
  function createTodoItem(label, allTime) {
    return {
      label, // eslint-disable-next-line no-plusplus
      id: uid(),
      edit: false,
      completed: false,
      time: new Date(),
      startTime: allTime,
      allTime,
      timerActive: true,
    };
  }

  function addItem(text, allTime) {
    const newItem = createTodoItem(text, allTime);
    const newArr = [...todo, newItem];

    setTodo(newArr);
  }

  function onKeyDown(e) {
    let second;
    let minute;

    if (labelMin === '') {
      minute = 1;
    } else {
      minute = labelMin;
    }

    if (labelSec === '') {
      second = 30;
    } else {
      second = labelSec;
    }

    if (e.key === 'Enter' && label.trim()) {
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
        type="text"
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={onLabelMinChange}
        value={labelMin}
      />
      <input
        type="text"
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={onLabelSecChange}
        value={labelSec}
      />
    </header>
  );
};

export default NewTaskForm;
