import React from 'react';
import styled from 'styled-components';
import Showtimes from 'containers/showtimes';
import Football from 'containers/football';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: stretch;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: #3f51b5;
`;

const Title = styled.div`
  font-family: 'Open Sans';
  font-size: 20px;
  color: white;
  font-weight: 600;
`;

const Widgets = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Dashboard = () => (
  <Container>
    <Header>
      <Title>Dashboard</Title>
    </Header>
    <Widgets>
      <Showtimes />
      <Football />
    </Widgets>
  </Container>
);

Dashboard.propTypes = {};

export default Dashboard;
