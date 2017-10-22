import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from 'components/loader';
import Error from 'components/error';
import theme from 'theme';

const Container = styled.div`
  border: 1px solid ${props => props.color};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
  min-width: 400px;
  margin: 20px;
`;

const Header = styled.div`
  display: flex;
  background-color: ${props => props.color};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;

const WidgetTitle = styled.div`
  font-family: 'Open Sans';
  font-size: 18px;
  color: white;
  font-weight: 600;
`;

const WidgetContainer = styled.div`
  margin: 20px;
`;

const Widget = ({
  loading, error, title, children, renderAction, color,
}) => {
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Error error={error} />;
  }
  return (
    <Container color={color}>
      <Header color={color}>
        <WidgetTitle>{title}</WidgetTitle>
        {renderAction ? renderAction() : null}
      </Header>
      <WidgetContainer>{children()}</WidgetContainer>
    </Container>
  );
};

Widget.defaultProps = {
  color: theme.colors.RED,
};

Widget.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
  loading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  renderAction: PropTypes.func,
  children: PropTypes.func.isRequired,
};

export default Widget;
