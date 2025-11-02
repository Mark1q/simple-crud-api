# Product CRUD API with Authentication

> A secure REST API built with Express.js and MongoDB, featuring JWT authentication, role-based access control, and comprehensive request validation.

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v4.x-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)

## ✨ Features

- 🔐 **JWT Authentication** with access & refresh tokens
- 👥 **Role-Based Authorization** (admin, user)
- ✅ **Request Validation** with Joi schemas
- 📦 **Full CRUD** operations for products
- 🛡️ **Password Security** with bcrypt hashing
- 🍪 **HTTP-only cookies** for refresh tokens
- 🗄️ **MongoDB Atlas** integration with Mongoose

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Create .env file with required variables
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
NODE_ENV=development

# Start the server
npm run dev
```

The API will be running at `http://localhost:5000`

## 📖 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth` | Register new user | No |
| `POST` | `/api/auth/login` | Login user | No |
| `POST` | `/api/auth/logout` | Logout user | No |
| `POST` | `/api/auth/refresh` | Refresh access token | Yes (Refresh Token) |

### Products

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| `GET` | `/api/products` | Get all products | No | - |
| `GET` | `/api/products/:id` | Get single product | No | - |
| `POST` | `/api/products` | Create new product | Yes | Admin |
| `PUT` | `/api/products/:id` | Update product | Yes | User |
| `DELETE` | `/api/products/:id` | Delete product | Yes | Admin |

## 💡 Example Requests & Responses

### Register & Login
```bash
POST /api/auth
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "StrongPass123!",
  "role": "user"
}
```

```bash
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "StrongPass123!"
}
```

**Login Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Products
```bash
# Get all products
GET /api/products

# Create product (Admin only)
POST /api/products
Authorization: Bearer YOUR_ACCESS_TOKEN
{
  "name": "Laptop",
  "quantity": 15,
  "price": 999.99,
  "image": "https://example.com/laptop.jpg"
}
```

**Product Response:**
```json
{
  "_id": "671a9b8c4bfa48a59f5cd234",
  "name": "Laptop",
  "quantity": 15,
  "price": 999.99,
  "image": "https://example.com/laptop.jpg",
  "createdAt": "2025-10-24T10:30:00.000Z",
  "updatedAt": "2025-10-24T10:30:00.000Z"
}
```

## 📁 Project Structure

```
product-crud-api/
├── controller/          # Business logic
├── middleware/          # Auth, validation, RBAC
├── models/             # Mongoose schemas
├── routes/             # API routes
├── validations/        # Joi schemas
├── utils/              # Token/cookie configs
└── index.js            # Entry point
```

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose ODM
- **Authentication:** JWT (jsonwebtoken), bcrypt
- **Validation:** Joi, validator.js
- **Config:** dotenv, envalid

## 🔒 Security Features

- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens for stateless authentication
- HTTP-only cookies for refresh tokens
- Strong password validation
- Role-based access control
- Input sanitization with Joi

## 📝 Environment Variables

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
ACCESS_TOKEN_SECRET=your_secure_access_token_secret
REFRESH_TOKEN_SECRET=your_secure_refresh_token_secret
NODE_ENV=development
```
