import React from 'react';
import styled from 'styled-components';
import Showtimes from 'containers/showtimes';

const Container = styled.div``;

const Dashboard = () => (
  <Container>
    <Showtimes names={['UGC Lille', 'Le Majestic Lille']} />
  </Container>
);

Dashboard.propTypes = {};

export default Dashboard;
