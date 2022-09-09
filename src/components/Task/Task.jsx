import React, { useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Proptypes from 'prop-types';
import './Task.css';
import { useState } from 'react';

const Task = ({ todo, setTodo, props }) => {
  const { id, label, edit, completed, time, allTime, startTime, timerActive } = props;
  const [sec, setSec] = useState(allTime);
  useEffect(() => {
    console.log(sec)
    const interval = setInterval(() => {
      timerActive && setSec((timer) => (timer >= 1 ? timer - 1 : 0))
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timerActive, allTime]);

  function timeReform(sec) {
    const newMinute = Math.floor(sec / 60);
    const newSeconds = sec % 60;
    return `${newMinute}:${newSeconds}`;
  }

  useEffect(() => {
    if (sec === 0) {
      replayTime(id, startTime);
    }
  }, [sec])

  function deleteItem(idTask) {
    const idx = todo.findIndex((el) => el.id === idTask);

    const newArray = [...todo.slice(0, idx), ...todo.slice(idx + 1)];

    setTodo(newArray);
  }

  function editItem(value, idTask) {
    const idx = todo.findIndex((el) => el.id === idTask);
    const oldItem = todo[idx];
    const newItem = { ...oldItem, label: value, edit: false };

    const newArray = [...todo.slice(0, idx), newItem, ...todo.slice(idx + 1)];

    setTodo(newArray);
  }

  function pressKeyDown(e, idTask) {
    if (e.key === 'Enter' && e.target.value.trim()) {
      editItem(e.target.value, idTask);
    }
  }

  function toggleProperty(arr, idTask, propName) {
    const idx = arr.findIndex((el) => el.id === idTask);

    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  function onClickEdit(idTask) {
    setTodo(toggleProperty(todo, idTask, 'edit'));
  }

  function onClickPlay(idTask) {
    const idx = todo.findIndex((el) => el.id === idTask);
    const oldItem = todo[idx];
    const newItem = { ...oldItem, timerActive: true };

    const newArray = [...todo.slice(0, idx), newItem, ...todo.slice(idx + 1)];

    setTodo(newArray);
  }

  function onClickPaused(idTask) {
    const idx = todo.findIndex((el) => el.id === idTask);
    const oldItem = todo[idx];
    const newItem = { ...oldItem, timerActive: false };

    const newArray = [...todo.slice(0, idx), newItem, ...todo.slice(idx + 1)];

    setTodo(newArray);
  }

  function onMarkImportant(idTask) {
    setTodo(toggleProperty(todo, idTask, 'completed'));
  }

  function replayTime(idTask, startTimer) {
    const idx = todo.findIndex((el) => el.id === idTask);
    setSec(startTimer)
    const oldItem = todo[idx];
    const newItem = { ...oldItem, allTime: startTimer, timerActive: false };
    const newArray = [...todo.slice(0, idx), newItem, ...todo.slice(idx + 1)];

    setTodo(newArray);
  }

  let classNames = '';
  let classNamesInput = 'none';

  

  if (edit && completed) {
    classNames = 'editing completed';
    classNamesInput = 'edit';
  } else if (completed) {
    classNames = 'completed';
  } else if (edit) {
    classNames = 'editing';
    classNamesInput = 'edit';
  }

  return (
    <span className={classNames}>
      <div className="view">
        <input className="toggle" checked={completed} type="checkbox" onChange={() => onMarkImportant(id)} id={id} />
        <label htmlFor={id}>
          <span className="title">{label}</span>
          <span className="description">
            <button className="icon icon-play" type="button" onClick={() => onClickPlay(id)} />
            <button className="icon icon-pause" type="button" onClick={() => onClickPaused(id)} />
            <span className="time-text">{timeReform(sec)}</span>
          </span>
          <span className="created description">
            created
            {` ${formatDistanceToNow(time, { includeSeconds: true })} `} ago
          </span>
        </label>
        <button className="icon icon-edit" onClick={() => onClickEdit(id)} type="button" />
        <button className="icon icon-destroy" onClick={() => deleteItem(id)} type="button" />
      </div>
      <input type="text" className={classNamesInput} defaultValue={label} onKeyDown={(e) => pressKeyDown(e, id)} />
    </span>
  );
};

export default Task;

Task.proptype = {
  id: Proptypes.string.isRequired,
  label: Proptypes.string.isRequired,
  completed: Proptypes.bool.isRequired,
  edit: Proptypes.bool.isRequired,
  time: Proptypes.instanceOf(Date).isRequired,
  allTime: Proptypes.number.isRequired,
  onDeleted: Proptypes.func.isRequired,
  onToggleCompleted: Proptypes.func.isRequired,
  editTodo: Proptypes.func.isRequired,
  onClickPlay: Proptypes.func.isRequired,
  onClickPaused: Proptypes.func.isRequired,
  replayTime: Proptypes.func.isRequired,
  startTime: Proptypes.number.isRequired,
};
