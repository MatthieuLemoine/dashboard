import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ name, color, size }) => (
  <i
    style={{
      color,
      fontSize: size,
    }}
    className={`fa fa-${name}`}
  />
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default Icon;
