import React from 'react';
import Proptypes from 'prop-types';

const Footer = ({ noCompletedCount }) => {
  return <span className="todo-count">{noCompletedCount} items left</span>;
};
Footer.proptype = {
  noCompletedCount: Proptypes.number.isRequired,
};
export default Footer;
