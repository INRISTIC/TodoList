import React from 'react';
import Proptypes from 'prop-types';

const TaskFilter = ({ setFlag, flag }) => {
  const filters = ['All', 'Completed', 'Active'];

  function onToggleFilter(flag) {
    setFlag(flag);
  }

  return (
    <ul className="filters">
      {filters.map((filter) => (
        <li key={filter}>
          <button
            type="button"
            className={flag === filter ? 'selected' : ''}
            onClick={(event) => onToggleFilter(event.target.textContent)}
          >
            {filter}
          </button>
        </li>
      ))}
    </ul>
  );
};

TaskFilter.proptype = {
  onToggleFilter: Proptypes.func.isRequired,
};

export default TaskFilter;
