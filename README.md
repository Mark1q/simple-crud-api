# Product CRUD API with Authentication

> A secure and modern RESTful API built with Express.js and MongoDB, featuring JWT authentication, role-based access control, and comprehensive request validation. Perfect starter template for building scalable Node.js backends.

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v4.x-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## ✨ Features

- 🔐 **JWT Authentication** with access & refresh tokens
- 👥 **Role-Based Authorization** (admin, user)
- ✅ **Request Validation** with Joi schemas
- 📦 Full CRUD operations for products
- 🎯 MVC architecture with clean separation of concerns
- 🛡️ Comprehensive error handling
- 🔒 Password hashing with bcrypt
- 🍪 Secure HTTP-only cookies for refresh tokens
- ⚡ Fast and lightweight with Express.js
- 🗄️ MongoDB Atlas integration with Mongoose ODM
- 🔐 Environment-based configuration
- ⏱️ Automatic timestamps for all records
- ✅ Email and password validation

## 🚀 Quick Start

### Prerequisites

- Node.js 14+ 
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/product-crud-api.git
cd product-crud-api

# Install dependencies
npm install

# Create .env file with required variables
cat > .env << EOF
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
NODE_ENV=development
EOF

# Start the server
npm start
```

The API will be running at `http://localhost:5000`

## 📖 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth` | Register new user | No |
| `POST` | `/api/auth/login` | Login user | No |
| `POST` | `/api/auth/logout` | Logout user | No |
| `POST` | `/api/auth/refresh` | Refresh access token | Yes (Refresh Token) |

### Product Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| `GET` | `/api/products` | Get all products | No | - |
| `GET` | `/api/products/:id` | Get single product | No | - |
| `POST` | `/api/products` | Create new product | Yes | Admin |
| `PUT` | `/api/products/:id` | Update product | Yes | User |
| `DELETE` | `/api/products/:id` | Delete product | Yes | Admin |

### Example Requests

#### Register a User
```bash
curl -X POST http://localhost:5000/api/auth \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "StrongPass123!",
    "role": "user"
  }'
```

**Validation Rules:**
- Name: 3-100 characters
- Email: Valid email format
- Password: Min 8 characters, must contain uppercase, lowercase, number, and special character
- Role: Must be "user" or "admin"

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "StrongPass123!"
  }'
```

#### Create a Product (Requires Admin Auth)
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "name": "Laptop",
    "quantity": 15,
    "price": 999.99,
    "image": "https://example.com/laptop.jpg"
  }'
```

**Validation Rules:**
- Name: 3-100 characters, required
- Price: Positive number, required
- Quantity: Non-negative integer, defaults to 0
- Image: Valid URI format, optional

#### Update a Product (Requires User Auth)
```bash
curl -X PUT http://localhost:5000/api/products/671a9b8c4bfa48a59f5cd234 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "price": 899.99,
    "quantity": 20
  }'
```

**Validation Rules:**
- All fields optional
- At least one field must be provided
- Same validation rules as creation for provided fields

### Example Responses

#### Successful Login
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Product Response
```json
{
  "_id": "671a9b8c4bfa48a59f5cd234",
  "name": "Laptop",
  "quantity": 15,
  "price": 999.99,
  "image": "https://example.com/laptop.jpg",
  "createdAt": "2025-10-24T10:30:00.000Z",
  "updatedAt": "2025-10-24T10:30:00.000Z",
  "__v": 0
}
```

#### Validation Error Response
```json
{
  "error": "Validation failed",
  "details": [
    "password must contain uppercase, lowercase, number and special character",
    "email must be a valid email"
  ]
}
```

## 📁 Project Structure

```
product-crud-api/
├── controller/
│   ├── auth.controller.js       # Authentication logic
│   └── product.controller.js    # Product business logic
├── middleware/
│   ├── authentication.js        # JWT verification
│   ├── authorize.js             # Role-based access control
│   └── validation.js            # Request validation middleware
├── models/
│   ├── user.model.js            # User schema with validation
│   └── product.model.js         # Product schema
├── routes/
│   ├── auth.route.js            # Auth routes
│   └── product.route.js         # Product routes
├── validations/
│   ├── auth.validation.js       # Joi schemas for auth
│   └── product.validation.js    # Joi schemas for products
├── utils/
│   ├── cookie.js                # Cookie configuration
│   └── tokens.js                # Token expiration settings
├── config.js                    # Environment config
├── index.js                     # App entry point
└── .env                         # Environment variables
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
ACCESS_TOKEN_SECRET=your_secure_access_token_secret
REFRESH_TOKEN_SECRET=your_secure_refresh_token_secret
NODE_ENV=development
```

## 🗄️ Data Schemas

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique, validated),
  password: String (required, min 8 chars, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Product Schema
```javascript
{
  name: String (required),
  quantity: Number (default: 0),
  price: Number (required, default: 0),
  image: String (optional),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🔒 Authentication Flow

1. **Registration**: User signs up with email, password, and name
2. **Login**: User receives an access token (30min) and refresh token (7 days) stored in HTTP-only cookie
3. **Authorization**: Protected routes verify access token via Authorization header
4. **Token Refresh**: When access token expires, use refresh endpoint to get new access token
5. **Logout**: Clears refresh token cookie

## ✅ Request Validation

All input is validated using Joi schemas before reaching controllers:

### Registration Validation
- **Name**: 3-100 characters
- **Email**: Valid email format
- **Password**: Minimum 8 characters with uppercase, lowercase, number, and special character
- **Role**: Must be 'user' or 'admin'

### Product Validation
- **Create**: Name (required, 3-100 chars), Price (required, positive), Quantity (optional, non-negative), Image (optional, valid URI)
- **Update**: At least one field required, all fields optional, same rules as creation

Validation errors return helpful 400 responses with specific error messages.

## 🛡️ Security Features

- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens for stateless authentication
- HTTP-only cookies for refresh tokens
- Strong password validation (validator.js + Joi)
- Email validation
- Role-based access control
- Input sanitization and validation with Joi
- Environment-based security (secure cookies in production)

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose ODM
- **Authentication:** JWT (jsonwebtoken), bcrypt
- **Validation:** Joi, validator.js
- **Config:** dotenv, envalid
- **Architecture:** MVC Pattern

## 🎯 Roadmap

- [x] JWT authentication & authorization
- [x] Role-based access control
- [x] Request validation with Joi
- [ ] Pagination & filtering
- [ ] Image upload (Cloudinary/S3)
- [ ] Rate limiting
- [ ] Unit & integration tests
- [ ] Docker support
- [ ] API documentation (Swagger)
- [ ] Password reset functionality
- [ ] Email verification

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
