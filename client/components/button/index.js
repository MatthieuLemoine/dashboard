import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const Button = ({ onClick, children, ...props }) => (
  <Container onClick={onClick} role="button" {...props}>
    {children}
  </Container>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
