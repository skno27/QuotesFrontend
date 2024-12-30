# QuoteSocial Frontend

Welcome to the **QuoteSocial** frontend application! This project is built using the Vite framework with React, providing users with a seamless experience to create profiles, add their favorite quotes, and interact with quotes on other profiles.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)

  - [1. Clone the Repositories](#1-clone-the-repositories)
  - [2. Setup Environment Variables](#2-setup-environment-variables)
  - [3. Setup PostgreSQL Locally](#3-setup-postgresql-locally)

- [Running the Application Locally](#running-the-application-locally)
  - [1. Start the Backend Server](#1-start-the-backend-server)
  - [2. Start the Frontend Application](#2-start-the-frontend-application)
- [Project Status](#project-status)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

**QuoteSocial** is a platform where users can create personalized profiles, curate their favorite quotes, and engage with quotes posted on other users' profiles. This frontend application serves as the user interface, enabling interactions and functionalities essential for a vibrant social quoting experience.

> **Note:** This application is currently in the early stages of development but is fully end-to-end functional. Due to ongoing work on database configurations and limited access to AWS resources, the recommended way to explore the application is by running it locally.

## Features

- **User Profiles:** Create and manage personal profiles.
- **Quote Management:** Add, read, delete, and soon edit favorite quotes.
- **Interactive Experience:** Like and comment on quotes from other users.
- **Responsive Design:** Optimized for various device sizes.

## Technologies Used

- **Frontend:**

  - *https://github.com/skno27/QuotesFrontend*
  - [Vite](https://vitejs.dev/) - Fast frontend build tool
  - [React](https://reactjs.org/) - JavaScript library for building user interfaces
  - [Axios](https://axios-http.com/) - Promise-based HTTP client
  - [FontAwesome](http://docs.fontawesome.com) - Frontend icon library
  - [Bootstrap](https://getboostrap.com/) - Responsive, mobile-first design framework with class presets
  - [JWT-Decode](https://www.npmjs.com/package/jwt-decode) - Browser library for decoding jwt tokens

- **Backend:**
  - *https://github.com/skno27/QuotesRender_Backend*
  - [Express](https://expressjs.com) - NodeJS web framework
  - [Zod](https://zod.dev) - Schema declaration and validation library
  - [Redis](https://redis.io) - Cross platform, Memory based NoSQL database (unplugged)
  - [CORS](https://www.npmjs.com/package/cors) - Node package for managing cross-origin communications
  - [Prisma](https://www.prisma.io/docs) - Object relational mapper for Node and Typescript
  - [Bcrypt]() - Encryption library
  - [Postgresql]() - Open-source SQL database provided by EnterpriseDB

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** installed (version 14 or higher recommended, here i used v20.10.0)
- **npm** (comes with Node.js) or **yarn**
- Clone the [QuoteSocial Backend Repository](https://github.com/skno27/QuotesRender_Backend)
- **PostgreSQL** installed and running locally
- _(Optional)_ An AWS account if you plan to configure the database to be hosted online

## Installation

### 1. Clone the Repositories

First, clone both the frontend and backend repositories to your local machine.

**Frontend:**

```bash
git clone https://github.com/skno27/QuotesFrontend.git
cd quotesfrontend
```

**Backend:**

Open a new terminal window/tab and clone the backend repository:

```bash
git clone https://github.com/skno27/QuotesRender_Backend.git
cd QuotesRender_backend
```

### 2. Setup Environment Variables

**Frontend .env Setup:**

Create a .env file for managing environment variables:

```bash
touch .env
```

Add this variable to .env, it will point to the backend server:

```env
VITE_BACKEND_URL=http://localhost:8080/v1
```

Replace the url with something different, if you change it on the backend, or if you have other servers running and it needs to point elsewhere. Remember to append /v1 at the end, so that the api routes resolve correctly.

**Backend .env Setup:**

In the QuotesRender_Backend directory, create a .env file:

```bash
touch .env
```

Your backend .env will need to look something like this:

```env

DATABASE_URL=postgresql://username:password@localhost:5432/{database-name}
JWT_SECRET=your_jwt_secret
```

**_Note:_** Ensure that you replace username, password, and other placeholders with your actual PostgreSQL credentials and desired configurations. The next section will cover this in further detail.

### 3. Setup PostgreSQL Locally

To run the application locally, you need to have a PostgreSQL server running on your machine. Follow the steps below to set up PostgreSQL:

**a. Install Postgresql**

- **macOS:** You can install PostgreSQL using Homebrew, which I have found to be the most reliable:

  ```bash
  brew install postgresql
  ```

- **Windows:** Download the installer from the [official Postgresql website](https://www.postgresql.org/download/windows/) and follow the installation instructions.

- **Linux:** Use your distribution’s package manager. For example, on Ubuntu:

  ```bash
  sudo apt update
  sudo apt install postgresql postgresql-contrib
  ```

**b. Start Postgresql Service**

- **macOS (Homebrew)**:

  ```bash
  brew services start postgresql
  ```

- **Windows**: PostgreSQL usually starts automatically after installation. If not, start it via the Services panel.

- **Linux**:
  ```bash
  sudo service postgresql start
  ```

**c. Create a PostgreSQL Database and User**

1. **Access Postgresql Shell**

   ```bash
   psql postgres
   ```

2. **Create a New Database**
   ```sql
   CREATE DATABASE quotesocial;
   ```
3. **Create a New User**
   ```sql
   CREATE USER yourusername WITH PASSWORD 'yourpassword';
   ```
4. **Grant All Privileges on the Database to the User**

   ```sql
   GRANT ALL PRIVILEGES ON DATABASE quotesocial TO yourusername;
   ```

5. **Exit the Pg Shell**

   ```sql
   \q
   ```

**d. Update Backend .env File**

Ensure your DATABASE_URL in the backend .env file points to your local PostgreSQL instance. For example:

```env
DATABASE_URL=postgresql://yourusername:yourpassword@localhost:5432/quotesocial
```

_Tip: Replace yourusername and yourpassword with the credentials you set up earlier._

## Running the Application Locally

To experience QuoteSocial locally, you need to run both the backend server and the frontend application.

1. **Start the Backend Server**

Navigate to the backend directory and install dependencies:

```bash
cd QuotesRender_Backend
npm install
```

Start the backend server:

```bash
npm start
```

The backend server should now be running on http://localhost:8080

_Note: Ensure that PostgreSQL is running and the DATABASE_URL in your .env file is correctly configured._

2. **Start the Frontend Application**

In a new terminal window or tab, navigate to the frontend directory and install dependencies:

```bash
cd QuotesFrontend
npm install
```

Start the frontend application:

```bash
npm run dev
```

The frontend should now be accessible at http://localhost:5173 (default Vite port).

_Tip: Ensure that the VITE_BACKEND_URL in your frontend .env file matches the backend server URL._

**_Project Status_**

_QuoteSocial_ is still in the development stages. While core functionalities such as user profiles, quote management, and interactions are implemented and fully functional, ongoing work is focused on optimizing database configurations, deployment, and enhancing the user experience. Contributions and feedback are welcome to accelerate the development process.

**_Contributing_**

1. **Fork the project**
2. **Create your Feature Branch**

   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/AmazingFeature
   ```

5. **Open a Pull Request**

Please ensure your contributions adhere to the project’s coding standards.

## License

Distributed under the MIT License. See LICENSE for more information.

## Contact

Deshon Morgan
deshonmorgan1317@gmail.com
linkedin.com/in/shoncoding
github.com/skno27
