import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Widget from 'components/widget';
import Icon from 'components/icon';
import Button from 'components/button';

const Input = styled.input``;

const Cinemas = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Cinema = styled.div`
  margin: 20px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

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

const Showtimes = ({
  data: { loading, error, cinemas }, onSubmit, onUpdate, name, remove,
}) => (
  <Widget
    loading={loading}
    error={error}
    title="Showtimes"
    icon={{
      name: 'ticket',
      size: 24,
      color: '#ffffff',
    }}
    renderAction={() => (
      <Input
        type="text"
        name="name"
        value={name}
        onChange={onUpdate('name')}
        onKeyPress={e => e.key === 'Enter' && onSubmit()}
      />
    )}
  >
    {() => (
      <Cinemas>
        {cinemas.map(cinema => (
          <Cinema key={cinema.id}>
            <Row>
              <Name>{cinema.name}</Name>
              <Button onClick={() => remove(cinema.id)}>
                <Icon name="trash" size={15} color="#C62828" />
              </Button>
            </Row>
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
    )}
  </Widget>
);

Showtimes.defaultProps = {
  name: '',
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
  onSubmit: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  name: PropTypes.string,
};

export default Showtimes;
