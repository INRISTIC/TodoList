import React from 'react';
import Proptypes from 'prop-types';

import Task from '../task/Task';

const TaskList = ({
  todos,
  onDeleted,
  onEdit,
  onClickEdit,
  onMarkImportant,
  onClickPlay,
  onClickPaused,
  tick,
  replayTime,
}) => {
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
          onClickPlay={() => onClickPlay(itemProps.id)}
          onClickPaused={() => onClickPaused(itemProps.id)}
          tick={() => tick(itemProps.id)}
          replayTime={() => replayTime(itemProps.id, itemProps.startTime)}
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
      startTime: Proptypes.number.isRequired,
      allTime: Proptypes.number.isRequired,
    })
  ),
  onDeleted: Proptypes.func.isRequired,
  onEdit: Proptypes.func.isRequired,
  onClickEdit: Proptypes.func.isRequired,
  onMarkImportant: Proptypes.func.isRequired,
  onClickPlay: Proptypes.func.isRequired,
  onClickPaused: Proptypes.func.isRequired,
  tick: Proptypes.func.isRequired,
  replayTime: Proptypes.func.isRequired,
};

export default TaskList;
