import React, { Component } from 'react';

export default class NewTaskForm extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    label: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onKeyDown = (e) => {
    const { onItemAdded } = this.props;
    const { label } = this.state;
    if (e.key === 'Enter' && label.trim()) {
      onItemAdded(label);
      this.setState({
        label: '',
      });
    }
  };

  render() {
    const { label } = this.state;
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
      </header>
    );
  }
}
