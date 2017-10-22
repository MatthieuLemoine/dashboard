import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Widget from 'components/widget';
import theme from 'theme';

const Schedule = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Match = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.LIGHT_GREY};
  border-bottom-style: solid;
  margin-bottom: 10px;
  padding-bottom: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.div`
  font-family: 'Open Sans';
  font-size: 11px;
  color: ${theme.colors.GREY};
`;

const Time = styled.div`
  font-family: 'Open Sans';
  font-size: 11px;
  color: ${theme.colors.GREY};
`;

const Team = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${props => (props.end ? 'flex-end' : 'flex-start')};
  width: 200px;
`;

const Name = styled.div`
  font-family: 'Open Sans';
  font-size: 15px;
  color: ${theme.colors.DARK_GREY};
`;

const Image = styled.img``;

const Result = styled.div`
  font-family: 'Open Sans';
  font-size: 15px;
  color: ${theme.colors.DARK_GREY};
`;

const Football = ({ data: { loading, error, schedule } }) => (
  <Widget loading={loading} error={error} title="Football" color={theme.colors.LIGHT_BLUE}>
    {() => (
      <Schedule>
        {schedule.matchs.map((match, index) => (
          <Match key={index}>
            <Row>
              <Info>{match.info}</Info>
              <Time>{match.time}</Time>
            </Row>
            <Row>
              <Team>
                <Image src={match.teams[0].picture} />
                <Name>{match.teams[0].name}</Name>
              </Team>
              <Result>{match.result}</Result>
              <Team end>
                <Name>{match.teams[1].name}</Name>
                <Image src={match.teams[1].picture} />
              </Team>
            </Row>
          </Match>
        ))}
      </Schedule>
    )}
  </Widget>
);

Football.propTypes = {
  data: PropTypes.shape({
    error: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }),
    loading: PropTypes.bool,
    schedule: PropTypes.shape({
      matchs: PropTypes.arrayOf(PropTypes.shape({
        info: PropTypes.string.isRequired,
        result: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        teams: PropTypes.arrayOf(PropTypes.shape({
          name: PropTypes.string.isRequired,
          picture: PropTypes.string.isRequired,
        })),
      })).isRequired,
    }),
  }).isRequired,
};

export default Football;
