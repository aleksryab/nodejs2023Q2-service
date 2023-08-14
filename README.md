# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/engine/install/) and run it.

## Install

1. Clone repository:

   ```bash
   git clone https://github.com/aleksryab/nodejs2023Q2-service.git
   ```

2. Go to project directory:

   ```bash
   cd nodejs2023Q2-service
   ```

3. Switch to develop branch:

   ```bash
   git checkout docker-database
   ```

4. Install NPM modules (if you want to run tests locally):

   ```bash
   npm install
   ```

## Running application

1. Rename file `.env.example` to `.env`
2. Build images and run containers:

   ```bash
   npm run compose
   ```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

- To run all tests without authorization locally

  ```bash
  npm run test
  ```

- To run only one of all test suites

  ```bash
  npm run test -- <path to suite>
  ```

- To run all tests without authorization in the docker container
  ```bash
  npm run test:docker
  ```

## Vulnerabilities scanning

```bash
npm run scan
```

```bash
npm run scan:app
```

```bash
npm run scan:db
```

## Auto-fix and format

```bash
npm run lint
```

```bash
npm run format
```
