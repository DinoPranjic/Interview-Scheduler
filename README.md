# Interview Scheduler
By Dino Pranjic

Interview scheduler is a simple app designed to book interviews created using React. Users can book and cancel interviews within certain time slots and choose from a selection of interviewers.

##Final Product

## Setup

Install dependencies with `npm install`. Both the API server and Scheduler app must be running at the same time. Scheduler App is run at http://localhost:8000 while the API server is run at http://localhost:8001. The API server data can be reset by making a GET request to http://localhost:8001/api/debug/reset

## Running Webpack Development Server

```sh
npm start
```

## Running Scheduler App

```sh
npm start
```

## Dependencies
    * "axios": "^0.27.2",
    * "classnames": "^2.2.6",
    * "fsevents": "^1.2.9",
    * "normalize.css": "^8.0.1",
    * "react": "^16.9.0",
    * "react-dom": "^16.9.0",
    * "react-hooks-testing-library": "^0.6.0",
    * "react-scripts": "3.0.0",
    * "react-test-renderer": "^16.14.0"
