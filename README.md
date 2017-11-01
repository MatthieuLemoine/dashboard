# Dashboard

A personal dashboard and a GraphQL experiment.

## Install

```
yarn
```

## Build

```
npm run production
```

## Run

```
npm start
```

## Features

### Showtimes

- CRON :

```
pm2 start scripts/update-showtimes/process.json
```

### Footbal schedule

- CRON :

```
pm2 start scripts/update-football-schedule/process.json
```

### Repositories widget

Follow the latest release of your favorite projects.
