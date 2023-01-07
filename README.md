# Administer

The MERN stack-based admin dashboard (Administer app) is a powerful tool for managing various aspects of a web application, including products, customers, transactions, and more. With this dashboard, you can easily see where your users are located on a world map, visualize sales overviews by day and month, breakdown sales using pie charts, and manage admins and affiliate sales performance by user.

One of the standout features of this admin dashboard is the dashboard includes a visual sales overview, allowing you to see how your sales are trending on a daily or monthly basis. You can also use the pie chart feature to get a breakdown of sales by different categories or segments, giving you a deeper understanding of your business.

In addition, the dashboard has ability to manage products, users and sales. The dashboard also allows you to view and manage customer transactions, making it easy to keep track of your sales and revenue.

Overall, the MERN stack-based admin dashboard is a valuable tool for any business looking to streamline their operations and gain valuable insights into their sales and customer data.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

- Node.js >= 18.12.1
- NPM >= 8.19.2
- MongoDB

## Installation

  1. Clone the repository

    $ git clone https://github.com/OverloadedSam/administer.git

  2. Go to `client` and `server` directory one by one and install dependencies with command shown at 3rd step.

    $ cd client/
    // And
    $ cd server/


  3. Install the dependencies

    $ npm install

## Configure App

You have to set the environment variables of your configuration before starting the app.

### 1. Environment variables for `client`

Create a `.env` file at `administer/client/` directory and set the following environment variables starting with prefix `VITE_`

    VITE_BASE_URL={api_url_of_the_backend} // e.g: http://localhost:8000/

### 2. Environment variables for `server`

Create a `.env` file at `administer/server/` directory and set the following environment variables.

    PORT=8000 // You can set any port number that is available but make sure to correctly include it in client environment variables.
    DB_NAME=Administer
    DB_CONNECTION_STRING={your_mongodb_connection_uri}


## Running The Project
### Start Server (Node API)

    $ cd administer/server // go to server directory
    $ npm run dev // run backend with hot reloading.
    // or you can run the backend with standard command
    $ node server.js

### Start Client (React app [VITE])

    $ cd administer/client // go to client directory
    $ npm run dev

## Deployment

The app can be deployed to a hosting platform such as Render or Heroku.

## Built With

- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Nivo](https://nivo.rocks/)
