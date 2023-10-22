# Innoscripta News Task Client

## Prerequisites
Before starting the client side of this app, you need to have the backend running. You can find the backend repository [here](https://github.com/halathamneh/innoscripta-news-task-api).

## Installation


Once you have the backend up and running, create a `.env` file in the root directory of the project and add the following variables:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

### Docker

You can use docker to run the project. Just run the following command in the root directory of the project:

```bash
docker compose up
```

Then you can access the client at http://localhost:3000.

You can change the port in the env file by setting the `PORT` variable.

### Local

You can also run the project locally. To do so, you need to have nodejs installed on your machine.

First, install the dependencies:

```bash
npm install
```

Then, run the project:

```bash
npm run dev
```

Then you can access the client at http://localhost:3000.

You can change the port in the env file by setting the `PORT` variable.
