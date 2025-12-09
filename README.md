# Product Management App

A full-stack **MERN** (MongoDB, Express, React, Node.js) application for managing products and users with role-based access. The project consists of a **backend API** built with Express and MongoDB and a **frontend** built with React (Vite) that communicates with the backend.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Frontend Pages](#frontend-pages)
- [Scripts](#scripts)
- [License](#license)

---

## Features

- **User Authentication**: Register, login, JWT-based auth
- **Role-based Authorization**: Admin vs User
- **CRUD Operations**:
  - Products: Create, Read, Update, Delete
  - Users: Admin can view all users and update roles
- **Frontend**:
  - React + Vite
  - Protected routes based on authentication and roles
  - Axios API layer with token handling
- **Backend**:
  - Express API
  - MongoDB via Mongoose
  - Joi validation
  - Middleware for logging, errors, authentication, and role checks

---

## Tech Stack

- **Frontend**: React, Vite, Bootstrap, React Router DOM, Axios  
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Joi  
- **Dev Tools**: Nodemon, dotenv, morgan  

---

## Project Structure

### Backend
```
/backend
├── /config
│   └── db.js
├── /src
│   ├── /controllers
│   ├── /middleware
│   ├── /models
│   ├── /routes
│   └── /validators
├── .env
├── package.json
└── server.js
```

### Frontend
```
/frontend
├── /src
│   ├── /api
│   ├── /components
│   ├── /context
│   └── /pages
├── App.jsx
└── main.jsx
```

---

## Installation

### Backend Setup

1. Navigate to backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file with the following:
   ```
   MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
   PORT=3000
   JWT_SECRET=mysecretkey
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   Server runs at `http://localhost:3000`.

### Frontend Setup

1. Navigate to frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```
   Frontend runs at the port Vite provides (default `http://localhost:5173`).

---

## API Endpoints

### User Routes

| Method | Endpoint                   | Access  | Description                 |
|--------|----------------------------|---------|-----------------------------|
| POST   | `/users/register`          | Public  | Register new user           |
| POST   | `/users/login`             | Public  | Login user                  |
| GET    | `/users/all`               | Admin   | Get all users               |
| PUT    | `/users/update-role/:id`   | Admin   | Update user role            |

### Product Routes

| Method | Endpoint                        | Access      | Description                |
|--------|---------------------------------|-------------|----------------------------|
| POST   | `/products/add`                 | Admin       | Create new product         |
| GET    | `/products/all`                 | Authenticated | Get all products          |
| GET    | `/products/view/:id`            | Authenticated | Get single product by id  |
| PUT    | `/products/update/:id`          | Admin       | Update product            |
| DELETE | `/products/delete/:id`          | Admin       | Delete product            |

---

## Frontend Pages

- **Public Pages**:
  - Home
  - Login
  - Register
- **Authenticated Pages**:
  - Dashboard
  - Products
  - Single Product
- **Admin Only Pages**:
  - Add Product
  - Edit Product
  - Users List
  - Update User Role
- **Fallback Page**:
  - NotFound

---

## Scripts

### Backend
```bash
npm run dev    # start server with nodemon
npm start      # start server normally
```

### Frontend
```bash
npm run dev    # start Vite dev server
npm run build  # build production bundle
```

---

## License

MIT License