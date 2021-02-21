# RxDB GraphQL replication with Next.js and server-side rendering
## ⚠️ Work in progress
This is Work in Progress project. **Nothing** from this repository should be used on production servers.

## Overview
The repo contains a working example of Next.js app which integrates RxDB and pull/push GraphQL replication of the remote data store hosted on Hasura. Important to note that data is fetched during and then rendered on the server side. It is then "hydrated" during client side rendering without extra GraphQL request being done.

The purpose of the example is to confirm that it is completely possible (or otherwise not impossible due to found limitations) to completely delegate data manupalition in React app to RxDB, with GraphQL server being used a remote store and replicated within the frontend app. A few pieces of the code can later be separated from the repo into standalone libs or utilities.js.

## Current progress
- [x] [Server side rendering](https://github.com/ottofeller/graphql-replication-playground/blob/6eb5f0c16f3febf89116918f1b25050cf2a23fa6/frontend/src/pages/_app.tsx#L44-L46)
- [x] ["Hydration" in the frontend app](https://github.com/ottofeller/graphql-replication-playground/blob/6eb5f0c16f3febf89116918f1b25050cf2a23fa6/frontend/src/Home/index.tsx#L57-L61)

- [x] [Async interaction with RxDB collection's `.find()` method within React component](https://github.com/ottofeller/graphql-replication-playground/blob/6eb5f0c16f3febf89116918f1b25050cf2a23fa6/frontend/src/Home/index.tsx#L63)
- [x] [Validation of RxDB schema with GraphQL schema](https://github.com/ottofeller/graphql-replication-playground/blob/6eb5f0c16f3febf89116918f1b25050cf2a23fa6/frontend/src/config/collections.tsx#L32)
- [ ] Unit tests

- [ ] A dynamic or prioritised replication. This is the most important missing piece which makes the approach barely suitable for a publicly faced web app. Currently the replication query/mutation (pull/push) are defined once and never get changed. For a publicly available web app this is not acceptable, as if there is a single query that fetches all the necessary data at the start of an app then the app loading time will be incrediably high. Slow app means high bounce rate and slow growth of users base.
  
  The [DBContext](https://github.com/ottofeller/graphql-replication-playground/blob/6eb5f0c16f3febf89116918f1b25050cf2a23fa6/frontend/src/common/DBContext/index.tsx#L1-L107) component and therefore its [config](https://github.com/ottofeller/graphql-replication-playground/blob/6eb5f0c16f3febf89116918f1b25050cf2a23fa6/frontend/src/config/collections.tsx#L1-L47) should be modified in the way that allows each individual page of a Next.js app to set different pull/push replication query/mutation. Also, if necessary the caching layer of the Apollo client (the lib that is used for interacting with GraphQL server) should be tweaked up so that the data fetched on different pages are accumulated and can be reused by different queries spread across pages.

  Also, it is common for pages of web apps to call different queries on a single page based on user's interaction. In such cases a query with requested data should be replicated immediately to be used by RxDB layer. Otherwise UX will apparently suffer.

## Installation
The project includes Next.js frontend app as well as GraphQL API based on Hasura. In order to start it up in a quick way you will need to [install Docker](https://www.docker.com/get-started). The entire stack is described in in `docker-compose.yml` file, and can be started with a single command.

## Run
### Quick start
Run this command in the root dir of the project.
```sh
docker-compose up
```

After a couple of minutes the fully functional app should be available at http://localhost:3000.

### Performant way
Running next.js app in the docker container is much slower than running it directly on the host machine. So, in terms of performance it is better to start the backend app and DB in Docker like this:
```sh
docker-compose up postgres hasura
```

And then start the next.js app outside of the Docker environment, on the host machine (just a usual way to start node.js app):
```sh
npm run dev
```

## Tests
With the following command you can run only those unit tests which are affected by changed files (before commit):
```sh
npm run test
```

In order to run all available tests:
```sh
npm run test:all
```

## Linters
Only shows error messages, no auto formatting:
```sh
npm run lint
```
