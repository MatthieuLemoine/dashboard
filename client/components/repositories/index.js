import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Widget from 'components/widget';
import Icon from 'components/icon';
import Button from 'components/button';
import format from 'date-fns/format';
import theme from 'theme';

const Input = styled.input``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Repository = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.LIGHT_GREY};
  border-bottom-style: solid;
  margin-bottom: 10px;
  padding-bottom: 10px;
`;

const Information = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.a`
  font-family: 'Open Sans';
  font-size: 15px;
  color: ${theme.colors.DARK_GREY};
  font-weight: 600;
`;

const Description = styled.div`
  font-family: 'Open Sans';
  font-size: 12px;
  color: ${theme.colors.DARK_GREY};
  margin-right: 20px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Issues = styled.div`
  font-family: 'Open Sans';
  font-size: 13px;
  color: ${theme.colors.GREEN};
  margin-left: 10px;
`;

const Stars = styled.div`
  font-family: 'Open Sans';
  font-size: 13px;
  color: ${theme.colors.DARK_GREY};
  margin-left: 10px;
`;

const Delete = styled(Button)`
  margin-left: 15px;
`;

const Release = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  border-style: solid;
  border-width: 0;
  border-left-width: 1px;
  padding-left: 10px;
`;

const ReleaseName = styled.a`
  font-family: 'Open Sans';
  font-size: 14px;
  color: ${theme.colors.DARK_GREY};
  font-weight: 600;
`;

const Author = styled.div`
  font-family: 'Open Sans';
  font-size: 12px;
  color: ${theme.colors.DARK_GREY};
  margin-right: 20px;
`;

const Repositories = ({
  data: { loading, error, repositories },
  onSubmit,
  onUpdate,
  name,
  remove,
}) => (
  <Widget
    loading={loading}
    error={error}
    title="Repositories"
    icon={{
      name: 'github',
      color: '#ffffff',
      size: 24,
    }}
    color={theme.colors.GITHUB}
    renderAction={() => (
      <Input
        type="text"
        name="name"
        value={name}
        onChange={onUpdate('name')}
        onKeyPress={e => e.key === 'Enter' && onSubmit()}
        placeholder="owner/name"
      />
    )}
  >
    {() => (
      <Container>
        {repositories.map(repository => (
          <Repository key={repository.id}>
            <Information>
              <Column>
                <Name href={repository.url} target="__blank">
                  {repository.nameWithOwner}
                </Name>
                <Description>{repository.description}</Description>
              </Column>
              <Column>
                <Row>
                  <Column>
                    <Row>
                      <Icon name="star" size={13} color={theme.colors.DARK_GREY} />
                      <Stars>{repository.stargazers}</Stars>
                    </Row>
                    <Row>
                      <Icon name="exclamation-circle" size={13} color={theme.colors.GREEN} />
                      <Issues>{repository.issues}</Issues>
                    </Row>
                  </Column>
                  <Delete onClick={() => remove(repository.id)}>
                    <Icon name="trash" size={15} color="#C62828" />
                  </Delete>
                </Row>
              </Column>
            </Information>
            {repository.lastRelease ? (
              <Release>
                <ReleaseName href={repository.lastRelease.url}>
                  {repository.lastRelease.name}
                </ReleaseName>
                <Author>
                  {`Released by ${repository.lastRelease.author.name} on ${format(
                    repository.lastRelease.createdAt,
                    'MMMM D',
                  )}`}
                </Author>
              </Release>
            ) : null}
          </Repository>
        ))}
      </Container>
    )}
  </Widget>
);

Repositories.propTypes = {
  data: PropTypes.shape({
    error: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }),
    loading: PropTypes.bool,
    repositories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      nameWithOwner: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      primaryLanguage: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      }).isRequired,
      issues: PropTypes.number.isRequired,
      stargazers: PropTypes.number.isRequired,
      lastRelease: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        author: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          login: PropTypes.string.isRequired,
        }).isRequired,
      }),
    })),
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  name: PropTypes.string,
};

export default Repositories;
