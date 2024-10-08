# Crowdfunding Application

This is a full-stack crowdfunding application featuring a Node.js and Express backend with Prisma for MySQL database management and a React frontend.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Client Side Setup](#client-side-setup)
- [Server Side Setup](#server-side-setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication
- Campaign creation and management
- Donation tracking and management
- Responsive design for web and mobile devices

## Technologies
- **Frontend:**
  - React
  - Axios
  - Tailwind
- **Backend:**
  - Node.js
  - Express
  - Prisma
  - JWT for Auth
- **Database:**
  - MySQL

## Installation

To set up the project locally, follow the steps below for both the client and server sides.

 **Clone the repository:**
   ``bash
   git clone https://github.com/martingeorge191110/crowdfunding-app.git

### Client Side Setup

1. **Navigate to the Client directory:**
   ```bash
   cd crowdfunding-app/client

2. **Install dependencies:**
   ```bash
   npm install

3. **Run the client application:**
   ```bash
   npm start

### Server Side Setup

1. **Navigate to the Server directory:**
   ```bash
   cd ../server

2. **Install dependencies:**
   ```bash
   npm install

3. **Set up environment variables:**
   Create a <code>.env</code> file in the server directory and add your MySQL database connection URL:
   ```makefile
   DATABASE_URL="mysql://user:password@localhost:3306/database_name"

4. **Run Prisma migrations:**
   this command will create the necessary tables in your MySQL database.
   ```bash
   npx prisma migrate dev --name init

5. **Start the server:**
   ```bash
   npm start

### Project Structure
   The project structure is as follows:
   ```bash
   crowdfunding-app/
   ├── client/
   │   ├── public/
   │   ├── src/
   │   ├     ├── components/
   │   ├     ├── pages/
   │   ├     ├── serveices/
   │   ├     ├── store/
   │   ├     ├── utilis/
   │   ├     ├── App.js
   │   ├     ├── index.js
   │   ├     └── index.css
   │   └── package.json
   └── server/
       ├── src/
       ├── routers/
       ├── controllers/
       ├── prisma/
       ├── utilis/
       ├── middlewares/
       ├── server.js
       ├── .env
       └── package.json
