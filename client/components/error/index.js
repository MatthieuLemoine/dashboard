import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div``;

const Error = ({ error }) => <Container>{error.message}</Container>;

Error.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};

export default Error;
