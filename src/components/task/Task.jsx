import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Proptypes from 'prop-types';
import './task.css';

export default class Task extends Component {
  pressKeyDown = (e, id) => {
    const { onEdit } = this.props;
    if (e.key === 'Enter' && e.target.value.trim()) {
      onEdit(e.target.value, id);
    }
  };

  render() {
    const { id, label, onDeleted, onClickEdit, edit, onMarkImportant, completed, time } = this.props;

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
          <input className="toggle" checked={completed} type="checkbox" onChange={onMarkImportant} />
          <label>
            <span className="description">{label}</span>
            <span className="created">
              created
              {` ${formatDistanceToNow(time, { includeSeconds: true })} `} ago
            </span>
          </label>
          <button className="icon icon-edit" onClick={onClickEdit} type="button" />
          <button className="icon icon-destroy" onClick={onDeleted} type="button" />
        </div>
        <input
          type="text"
          className={classNamesInput}
          defaultValue={label}
          onKeyDown={(e) => this.pressKeyDown(e, id)}
        />
      </span>
    );
  }
}

Task.proptype = {
  task: Proptypes.shape({
    id: Proptypes.string.isRequired,
    label: Proptypes.string.isRequired,
    completed: Proptypes.bool.isRequired,
    edit: Proptypes.bool.isRequired,
    time: Proptypes.instanceOf(Date).isRequired,
  }).isRequired,
  del: Proptypes.func.isRequired,
  onToggleCompleted: Proptypes.func.isRequired,
  editTodo: Proptypes.func.isRequired,
};
