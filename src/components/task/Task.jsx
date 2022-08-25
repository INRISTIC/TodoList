import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Proptypes from 'prop-types';
import './task.css';

export default class Task extends Component {
  // eslint-disable-next-line react/sort-comp
  pressKeyDown = (e, id) => {
    const { onEdit } = this.props;
    if (e.key === 'Enter' && e.target.value.trim()) {
      onEdit(e.target.value, id);
    }
  };

  // eslint-disable-next-line class-methods-use-this
  timeReform = (allTime) => {
    const newMinute = Math.floor(allTime / 60);
    const newSeconds = allTime % 60;
    return `${newMinute}:${newSeconds}`;
  };

  componentDidMount() {
    const { tick, id } = this.props;
    this.interval = setInterval(() => tick(id), 1000);
  }

  componentDidUpdate(prevProps) {
    const { tick, id, timerActive, allTime, replayTime, startTime } = this.props;
    if (allTime === 0) {
      replayTime(id, startTime);
      clearInterval(this.interval);
    } else if (timerActive !== prevProps.timerActive) {
      if (timerActive) {
        this.interval = setInterval(() => tick(id), 1000);
      } else {
        clearInterval(this.interval);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      id,
      label,
      onDeleted,
      onClickEdit,
      edit,
      onMarkImportant,
      completed,
      time,
      allTime,
      onClickPlay,
      onClickPaused,
    } = this.props;

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
            <span className="title">{label}</span>
            <span className="description">
              <button className="icon icon-play" type="button" onClick={onClickPlay} />
              <button className="icon icon-pause" type="button" onClick={onClickPaused} />
              <span className="time-text">{this.timeReform(allTime)}</span>
            </span>
            <span className="created description">
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
