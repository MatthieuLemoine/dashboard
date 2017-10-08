import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from 'components/loader';
import Error from 'components/error';

const Container = styled.div``;

const Header = styled.div``;

const Cinemas = styled.div``;

const Cinema = styled.div``;

const Name = styled.div``;

const Movies = styled.div``;

const Movie = styled.div``;

const Title = styled.div``;

const Times = styled.div``;

const Showtime = styled.div``;

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
