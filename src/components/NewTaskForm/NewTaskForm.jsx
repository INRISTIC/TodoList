import React, { Component } from 'react';

export default class NewTaskForm extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    label: '',
    // eslint-disable-next-line react/no-unused-state
    labelMin: '',
    // eslint-disable-next-line react/no-unused-state
    labelSec: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onLabelMinChange = (e) => {
    this.setState({
      labelMin: Number(e.target.value),
    });
  };

  onLabelSecChange = (e) => {
    this.setState({
      labelSec: Number(e.target.value),
    });
  };

  onKeyDown = (e) => {
    const { onItemAdded } = this.props;
    const { label, labelMin, labelSec } = this.state;
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
      onItemAdded(label, minute * 60 + second);
      this.setState({
        label: '',
        labelMin: '',
        labelSec: '',
      });
    }
  };

  render() {
    const { label, labelMin, labelSec } = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          onKeyDown={this.onKeyDown}
          value={label}
        />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.onLabelMinChange}
          value={labelMin}
        />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.onLabelSecChange}
          value={labelSec}
        />
      </header>
    );
  }
}
