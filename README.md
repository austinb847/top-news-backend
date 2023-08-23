<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Backend Web Service for User Data Retrieval

This repository contains the backend service built with Nest.js that connects to a MongoDB database. The service is designed to retrieve user data, specifically logs of the URLs they have visited on the frontend web app. The API routes are guarded by authorization to ensure secure access to the data.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Authorization](#authorization)
  - [API Endpoints](#api-endpoints)

## Features

- Secure user data retrieval.
- Integration with MongoDB for storing and retrieving URL visit logs.
- Authorization guards on API routes.
- Built with Nest.js, a progressive Node.js framework.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed.
- MongoDB database set up and running.

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/austinb847/top-news-backend.git
   cd top-news-backend
   ```

2. Install the dependencies:

   ```bash
    npm install
   ```

3. Set up the environment variables:

   ```bash
   cp .env.example .env
   ```

4. Start the server:

   ```bash
    npm run start:dev
   ```

## Usage

### Authorization

The API routes are guarded by authorization. To access the routes, you will need to provide a valid JWT token in the `Authorization` header of the request. The token can be obtained by logging in to the frontend web app.

### API Endpoints

#### GET `/users/:userId/events`: Get logs of URLs visited by a user

- **Description**: Get logs of URLs visited by a user.
- **Authorization**: Required.

##### Request

- **URL parameters**:
  - `userId`: The ID of the user whose logs are to be retrieved.

##### Response

- **Status code**: `200 OK`
- **Body**: An array of objects, each representing a log entry. Each object has the following properties:
  - `url`: The URL visited by the user.
  - `timestamp`: The timestamp of the visit.

#### POST `/users/:userId/events`: Add a log of a URL visited by a user

- **Description**: Add a log of a URL visited by a user.
- **Authorization**: Required.

##### Request

- **URL parameters**:
  - `userId`: The ID of the user whose logs are to be retrieved.
- **Body**: An object representing the log entry. It has the following properties:
  - `url`: The URL visited by the user.

##### Response

- **Status code**: `201 Created`
- **Body**: An object representing the log entry. It has the following properties:
  - `url`: The URL visited by the user.
  - `timestamp`: The timestamp of the visit.
