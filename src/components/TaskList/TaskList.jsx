import React from 'react';
import Proptypes from 'prop-types';

import Task from '../task/Task';

const TaskList = ({ todos, todo, setTodo }) => {
  const elements = todos.map((item) => {
    const { ...itemProps } = item;
    return (
      <li key={itemProps.id}>
        <Task todo={todo} setTodo={setTodo} props={itemProps} />
      </li>
    );
  });
  return <ul className="todo-list">{elements}</ul>;
};

TaskList.proptype = {
  todos: Proptypes.arrayOf(
    Proptypes.shape({
      id: Proptypes.string.isRequired,
      label: Proptypes.string.isRequired,
      completed: Proptypes.bool.isRequired,
      edit: Proptypes.bool.isRequired,
      time: Proptypes.instanceOf(Date).isRequired,
      startTime: Proptypes.number.isRequired,
      allTime: Proptypes.number.isRequired,
    })
  ),
};

export default TaskList;
