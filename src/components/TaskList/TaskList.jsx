import React from 'react';
import Proptypes from 'prop-types';

import Task from '../task/Task';

const TaskList = ({ todos, onDeleted, onEdit, onClickEdit, onMarkImportant }) => {
  const elements = todos.map((item) => {
    const { ...itemProps } = item;
    return (
      <li key={itemProps.id}>
        <Task
          {...itemProps}
          onDeleted={() => onDeleted(itemProps.id)}
          onEdit={onEdit}
          onClickEdit={() => onClickEdit(itemProps.id)}
          onMarkImportant={() => onMarkImportant(itemProps.id)}
        />
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
    })
  ),
  onDeleted: Proptypes.func.isRequired,
  onEdit: Proptypes.func.isRequired,
  editTodo: Proptypes.func.isRequired,
};

export default TaskList;
