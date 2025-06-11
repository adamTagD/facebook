# My Fullstack App - Backend

This is the backend part of the My Fullstack App project, which is built using Express.js. The backend handles user authentication, including signup and login functionalities, and protects routes using JSON Web Tokens (JWT).

## Features

- User registration (signup)
- User login
- JWT-based authentication
- Protected routes for authenticated users

## Getting Started

### Prerequisites

- Node.js
- MongoDB (or any other database of your choice)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the backend directory:
   ```
   cd my-fullstack-app/backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application

To start the backend server, run:
```
npm start
```

The server will run on `http://localhost:5000` (or any port specified in your configuration).

### API Endpoints

- **POST /signup**: Register a new user
- **POST /login**: Authenticate a user and return a JWT
- **Protected Routes**: Use the JWT to access protected resources

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.