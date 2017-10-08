import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from 'components/loader';
import Error from 'components/error';

const Container = styled.div`
  border: 1px solid #ff5722;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
`;

const Header = styled.div`
  font-family: 'Open Sans';
  font-size: 18px;
  color: white;
  font-weight: 600;
  background-color: #ff5722;
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
`;

const Cinemas = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
`;

const Cinema = styled.div``;

const Name = styled.div`
  font-family: 'Open Sans';
  font-size: 17px;
  font-weight: 600;
  color: #424242;
  margin-bottom: 10px;
`;

const Movies = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Movie = styled.div`
  display: flex;
  flex-direction: column;
  border-style: solid;
  border-width: 0px;
  border-left-width: 1px;
  border-color: #424242;
  margin-right: 10px;
  margin-bottom: 10px;
  padding-left: 10px;
`;

const Title = styled.div`
  font-family: 'Open Sans';
  font-size: 14px;
  font-weight: 600;
  color: #424242;
`;

const Times = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Showtime = styled.div`
  font-family: 'Open Sans';
  font-size: 13px;
  color: #424242;
  margin-right: 10px;
`;

const Showtimes = ({ data: { loading, error, cinemas } }) => {
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Error error={error} />;
  }
  return (
    <Container>
      <Header>Showtimes</Header>
      <Cinemas>
        {cinemas.map(cinema => (
          <Cinema key={cinema.name}>
            <Name>{cinema.name}</Name>
            <Movies>
              {cinema.movies.map(movie => (
                <Movie key={movie.title}>
                  <Title>{movie.title}</Title>
                  <Times>
                    {movie.showtimes.map(showtime => (
                      <Showtime key={showtime}>{showtime}</Showtime>
                    ))}
                  </Times>
                </Movie>
              ))}
            </Movies>
          </Cinema>
        ))}
      </Cinemas>
    </Container>
  );
};

Showtimes.propTypes = {
  data: PropTypes.shape({
    error: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }),
    loading: PropTypes.bool,
    cinemas: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      movies: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        showtimes: PropTypes.arrayOf(PropTypes.string).isRequired,
      })).isRequired,
    })),
  }).isRequired,
};

export default Showtimes;
