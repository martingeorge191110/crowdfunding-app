# Crowdfunding Platform - Server Side

## Overview

This is the backend server for the Crowdfunding Platform. The server is built using **Express.js** and manages the API routes, authentication, and database operations required for the application. The core functionality includes user authentication, campaign management, and donation processing. The server connects to a **Prisma**-managed **MySQL** database, ensuring fast and reliable data operations.

### Key Features

- **Express.js Framework**: Provides routing, middleware support, and easy handling of API requests.
- **Prisma ORM**: Handles interactions with the MySQL database in a type-safe and efficient manner.
- **JWT Authentication**: Secures the platform with JSON Web Tokens for user sessions.
- **Cookie-based Authentication**: Utilizes cookies for managing session tokens securely.
- **Campaign & Donation Management**: API routes that handle all operations related to crowdfunding campaigns and donations.
- **Error Handling**: Centralized error handling through custom middleware for better debugging and user feedback.
- **Environment Configurations**: Utilizes `dotenv` to handle environment variables, keeping sensitive data secure.
- **Logging**: Provides detailed request logs using `morgan` for easier debugging and monitoring.

<h2>Server Configuration</h2>
<ul>
  <li>Port: The server listens on a configurable port via environment variables (default: <code>7000</code>).</li>
  <li>Environment Variables: Managed with <code>dotenv</code>, storing sensitive information like database credentials and JWT secrets.</li>
  <li>DATABASE_URL=mysql://<(USER_NAME)>:<(USER_PASSWORD)>@<(SERVER_HOST)>:3306/<(DATABASE_NAME)></li>
  <li>NODE_ENV=development</li>
  <li>JWT_SECRET=yoursecretkey</li>
  <li>JWT_EXP=yourexpiredate</li>
  <li>GMAIL_USER=(gmail account for sending mails)</li>
  <li>GMAIL_PASS=(generated app password)</li>
</ul>

---

## Authentication API

### Overview

The authentication API handles all user-related operations, including **user registration**, **login**, **logout**, **password reset**, and **token verification**. It integrates **bcrypt** for secure password hashing and **JWT** for token-based authentication. All operations are validated before being executed to ensure data integrity and security.

### Key Endpoints

<ul>
   <li><strong>POST /api/auth/register:</strong> Handles user registration, including input validation and password encryption before saving the user to the database.</li>
   <li><strong>POST /api/auth/login:</strong> Authenticates users by verifying credentials and generates a JWT token upon successful login.</li>
   <li><strong>POST /api/auth/gencode:</strong> Sends a password reset code via email for users who request a password reset.</li>
   <li><strong>PUT /api/auth/passreset:</strong> Resets the user's password after verifying the reset code.</li>
   <li><strong>POST /api/auth/logout:</strong> Clears session cookies and logs the user out.</li>
   <li><strong>GET /api/auth:</strong> Verifies the validity of the user's JWT token, checking for secure access.</li>
</ul>

## User Router and Controller

### Overview

The **User Router** manages all user-related actions, such as retrieving profiles, updating user data, deleting accounts, and searching for users. This section of the server interacts with the **Prisma** ORM to query the database and utilizes a middleware to ensure requests are properly authenticated. All sensitive operations (like deleting an account) require secure password verification through **bcrypt**.

### Key Endpoints

<ul>
   <li><strong>GET /api/user/profile:</strong> Retrieve the authenticated user's profile information.</li>
   <li><strong>PUT /api/user/profile:</strong> Update the authenticated user's profile details.</li>
   <li><strong>POST /api/user/profile:</strong> Delete the authenticated user's account after verifying the password.</li>
   <li><strong>DELETE /api/user/profile:</strong> Delete a specific section of the user's information, like bio or avatar, based on the query parameter.</li>
   <li><strong>GET /api/user/search:</strong> Search for user profiles by their unique ID, and return basic information like name, avatar, bio, and more.</li>
</ul>

## Campaigns Router and Controller

### Overview

The **Campaigns Router** handles all campaign-related actions, including creating, updating, deleting, and searching for campaigns. This section of the server interacts with the **Prisma** ORM to manage campaigns in the database. Users must be authenticated with a valid JWT token to perform any of these actions. Campaigns include details such as the campaign's name, description, goal, status, and more.

### Key Endpoints

<ul>
   <li><strong>POST /api/campaigns/:</strong> Creates a new campaign for the authenticated user. The request body must include details such as the campaign's name, description, goal, status, category, start date, end date, and PayPal email.</li>
   <li><strong>GET /api/campaigns/:</strong> Retrieves all campaigns created by the authenticated user.</li>
   <li><strong>PUT /api/campaigns/:</strong> Updates a campaign based on its ID. The query parameter <code>id</code> is required, and the request body should include the fields to be updated, such as name, description, goal, or status.</li>
   <li><strong>DELETE /api/campaigns/:</strong> Deletes a campaign by its ID. The query parameter <code>id</code> is required to identify the campaign for deletion.</li>
   <li><strong>GET /api/campaigns/search:</strong> Searches for campaigns based on query parameters, such as name, category, or goal. Returns a list of campaigns matching the search criteria.</li>
</ul>

## Donations Router and Controller

### Overview

The **Donations Router** handles all donation-related actions, including making donations, viewing donations, tracking notifications for donations, and managing donation statuses. This section of the server interacts with the **Prisma** ORM to manage donations in the database. All operations require the user to be authenticated with a valid JWT token. Donation details include campaign ID, user ID, amount, and status (such as seen by author).

### Key Endpoints

<ul>
   <li><strong>POST /api/donations/:</strong> Allows the authenticated user to donate to a specific campaign. The request body should include the donation amount, while the query parameter <code>campaignId</code> is required to specify the campaign.</li>
   <li><strong>GET /api/donations/:</strong> Retrieves all donations made for a specific campaign owned by the authenticated user. The query parameter <code>campaignId</code> is required to filter donations based on the campaign.</li>
   <li><strong>GET /api/donations/user:</strong> Fetches a list of all donations made by the authenticated user. It includes details like the donation amount, campaign name, and timestamp.</li>
   <li><strong>GET /api/donations/notifications:</strong> Retrieves donations made to campaigns owned by the authenticated user that have not yet been seen by the campaign author. It also marks these donations as notifications for the author.</li>
   <li><strong>PUT /api/donations/notifications:</strong> Updates the donation notifications to mark them as seen by the campaign author. This endpoint modifies all unseen donations to mark them as viewed.</li>
</ul>

# Database Schema Documentation

This documentation provides an overview of the relationships between the tables in the Prisma schema. It includes three main models: **User**, **Campaign**, and **Donation**.

### Key Features of the ERD:
- **PK** (Primary Key) is represented by the notation `PK`.
- **FK** (Foreign Key) is denoted by the notation `FK` and arrows indicating the relationships.
- **Lines and arrows** visually represent the one-to-many and many-to-one relationships between the models.

## Relations Diagram

```plaintext
 +--------------------+        +---------------------+       +--------------------+
 |       User         |        |      Campaign       |       |      Donation      |
 +--------------------+        +---------------------+       +--------------------+
 |  id         (PK)   |◄─────┐ |  id           (PK)  |       |  id          (PK)  |
 | f_name             |      │ | name                |       | amount             |
 | l_name             |      │ | description         |       | campaignId   (FK)  |
 | email              |      │ | goal                |       | userId       (FK)  |
 | password           |      │ | status              |       | createdAt          |
 | gender             |      │ | category            |       | seenByAuthor       |
 | avatar             |      │ | currentAmount       |       |                    |
 | bio                |      │ | startDate           |       |                    |
 | createdAt          |      │ | endDate             |       |                    |
 | updatedAt          |      │ | userId        (FK)  |◄──────|                    |
 +--------------------+      │ | createdAt           |       |                    |
                             │ | updatedAt           |       |                    |
                             │ +---------------------+       +--------------------+
                             │
                             └───── 1 (one)
                             ┌───── n (many)
