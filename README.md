# Product CRUD API 🛍️
*A modern RESTful API built with Express.js and MongoDB for managing products. Demonstrates clean architecture, modular design, and maintainable code — a solid foundation for real-world Node.js backends.*

## 🎯 Project Overview

A clean and modular CRUD API built with Express.js and MongoDB following the MVC pattern. Designed for clarity, scalability, and easy extension into production-grade systems.

---

## 🏗️ Architecture & Design

### **MVC Pattern**
- **Models**: Mongoose schemas with validation and timestamps
- **Views**: RESTful JSON responses
- **Controllers**: Business logic separated from routing

### **Controller Layer**
- **Separation of Concerns**: Route handlers separated into dedicated controllers
- **Reusable Logic**: DRY principles with centralized error handling
- **Clean Routes**: Thin route definitions delegating to controllers

### **Data Layer**
- **Mongoose ODM**: Elegant MongoDB object modeling
- **Schema Validation**: Built-in data validation at the model level
- **Timestamps**: Automatic `createdAt` and `updatedAt` tracking

---

## ✨ Core Features

### 📦 **Product Management**
- **Full CRUD Operations**: Create, Read, Update, Delete products
- **Data Validation**: Required fields and default values
- **Automatic Timestamps**: Track creation and modification times
- **Flexible Updates**: Partial updates with `findByIdAndUpdate()`

### 🔍 **API Endpoints**

#### **Get All Products**
```http
GET /api/products
```
Returns all products in the database.

**Example Response:**
```json
[
  {
    "_id": "671a9b8c4bfa48a59f5cd234",
    "name": "Pizza",
    "quantity": 10,
    "price": 12.99,
    "image": "https://example.com/pizza.jpg",
    "createdAt": "2025-10-24T09:30:00.000Z",
    "updatedAt": "2025-10-24T09:30:00.000Z",
    "__v": 0
  }
]
```

#### **Get Single Product**
```http
GET /api/products/:id
```
Returns a specific product by ID.

#### **Create Product**
```http
POST /api/products
Content-Type: application/json

{
  "name": "Pizza",
  "quantity": 10,
  "price": 12.99,
  "image": "https://example.com/pizza.jpg"
}
```

#### **Update Product**
```http
PUT /api/products/:id
Content-Type: application/json

{
  "name": "Large Pizza",
  "price": 15.99
}
```

#### **Delete Product**
```http
DELETE /api/products/:id
```

### 🛡️ **Error Handling**
- **Comprehensive Try-Catch**: All async operations wrapped in error handling
- **HTTP Status Codes**: Proper status codes (200, 404, 500)
- **Descriptive Messages**: Clear error messages for debugging

### ⚙️ **Configuration Management**
- **Environment Variables**: Secure configuration with `dotenv`
- **Config Validation**: Runtime validation with `envalid`
- **Default Values**: Sensible defaults for development

---

## 🛠️ Technical Stack

### **Backend Framework**
- **Express.js**: Fast, unopinionated web framework
- **Node.js**: JavaScript runtime for scalable server-side applications

### **Database**
- **MongoDB Atlas**: Cloud-hosted NoSQL database
- **Mongoose**: Elegant MongoDB object modeling

### **Middleware**
- **express.json()**: Built-in JSON body parser
- **express.urlencoded()**: Form data parser

### **Configuration**
- **dotenv**: Environment variable management
- **envalid**: Environment variable validation

---

## 📁 Project Structure

```
product-crud-api/
├── controller/
│   └── product.controller.js    # Business logic for product operations
├── models/
│   └── product.model.js          # Mongoose schema and model definition
├── routes/
│   └── product.route.js          # API route definitions
├── config.js                     # Environment configuration with validation
├── index.js                      # Application entry point and server setup
├── .env                          # Environment variables (not tracked)
├── .gitignore                    # Git ignore rules
├── package.json                  # Project dependencies and scripts
└── README.md                     # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
```bash
Node.js 14+ or higher
MongoDB Atlas account (or local MongoDB installation)
npm or yarn package manager
```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/product-crud-api.git
   cd product-crud-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_PASSWORD=your_mongodb_password_here
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

   The API will be running at `http://localhost:5000`

### Development Mode

For automatic server restart on file changes:
```bash
npm run dev
```

Or install nodemon globally:
```bash
npm install -g nodemon
nodemon index.js
```

---

## 📊 Data Model

### Product Schema

```javascript
{
  name: String (required),
  quantity: Number (default: 0),
  price: Number (required, default: 0),
  image: String (optional),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

**Example Product:**
```json
{
  "_id": "671a9b8c4bfa48a59f5cd234",
  "name": "Wireless Headphones",
  "quantity": 50,
  "price": 79.99,
  "image": "https://example.com/headphones.jpg",
  "createdAt": "2025-10-24T10:30:00.000Z",
  "updatedAt": "2025-10-24T10:30:00.000Z",
  "__v": 0
}
```

---

## 🧪 Testing

### Manual Testing with Tools

**Recommended Tools:**
- [Insomnia](https://insomnia.rest/) - Beautiful API client
- [Postman](https://www.postman.com/) - Popular API testing tool
- [Thunder Client](https://www.thunderclient.com/) - VS Code extension

### Example Requests

**Create a Product:**
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "quantity": 15,
    "price": 999.99
  }'
```

**Get All Products:**
```bash
curl http://localhost:5000/api/products
```

**Update a Product:**
```bash
curl -X PUT http://localhost:5000/api/products/YOUR_PRODUCT_ID \
  -H "Content-Type: application/json" \
  -d '{"price": 899.99}'
```

**Delete a Product:**
```bash
curl -X DELETE http://localhost:5000/api/products/YOUR_PRODUCT_ID
```

---

## 🔐 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port number | No | 5000 |
| `MONGODB_PASSWORD` | MongoDB Atlas password | Yes | - |

---

## 🤝 Contributing

Contributions are welcome! Here are some ways to enhance this project:

### Suggested Enhancements
- **Authentication**: Add JWT-based user authentication
- **Pagination**: Implement pagination for large product lists
- **Search & Filter**: Add query parameters for searching products
- **Image Upload**: Integrate cloud storage for product images
- **Validation**: Add request body validation with Joi or express-validator
- **Rate Limiting**: Protect API from abuse with rate limiting
- **Logging**: Add Winston or Morgan for request logging
- **Testing**: Implement unit and integration tests with Jest

### Development Guidelines
- Follow existing code style and structure
- Write clear commit messages
- Test your changes thoroughly
- Update documentation for new features

---

## 🚧 Future Development & Roadmap

The goal is to evolve this simple CRUD API into a fully featured production-grade backend. Below are upcoming milestones and planned improvements:

### 🧩 Planned Enhancements

#### 🔐 Authentication & Authorization
- Implement JWT-based user authentication
- Add role-based access control (admin, user)
- Secure product routes with middleware

#### 🧾 Validation & Data Integrity
- Integrate Joi or express-validator for request body validation
- Add centralized validation middleware
- Improve schema-level validation with custom Mongoose validators

#### 🔍 Search, Filter & Pagination
- Enable keyword search by product name or category
- Add pagination and sorting for large product lists
- Support query parameters like `?minPrice=10&maxPrice=100`

#### 🖼️ File Uploads
- Integrate image upload functionality (Multer + Cloudinary or AWS S3)
- Add image URL storage in MongoDB
- Validate file size and format

#### 🧠 Advanced Features
- Add product categories and relationships
- Implement soft deletes with an `isDeleted` flag
- Add an audit log for product changes

#### 📊 Analytics & Performance
- Add request logging with Morgan or Winston
- Measure performance and latency
- Introduce caching (Redis) for frequent reads

#### 🧪 Testing
- Write unit and integration tests with Jest or Mocha
- Mock database operations with mongodb-memory-server
- Automate testing via GitHub Actions CI/CD pipeline

#### ☁️ Deployment & Scalability
- Dockerize the application for consistent environments
- Deploy on platforms like Render, Railway, or AWS
- Use environment-based configs (dev/staging/prod)
- Add health checks and monitoring endpoints

### 🗓️ Long-Term Vision
- Build a user-facing frontend (React or Next.js)
- Add an Admin Dashboard for managing products
- Create an API documentation page with Swagger or Postman Collections
- Evolve into a microservice-ready backend structure

## 📈 Performance & Best Practices

### **Implemented Best Practices**
✅ **Environment Configuration**: Secure credential management  
✅ **Error Handling**: Comprehensive try-catch blocks  
✅ **MVC Architecture**: Clean separation of concerns  
✅ **RESTful Design**: Standard HTTP methods and status codes  
✅ **Mongoose ODM**: Efficient database operations  
✅ **Automatic Timestamps**: Built-in audit trail  

### **Scalability Considerations**
- **Database Indexing**: Add indexes for frequently queried fields
- **Connection Pooling**: MongoDB connection pooling handled by Mongoose
- **Async/Await**: Non-blocking asynchronous operations
- **Modular Structure**: Easy to extend with new features

---

## 🐛 Troubleshooting

### Common Issues

**Cannot connect to MongoDB:**
- Verify your `MONGODB_PASSWORD` in `.env`
- Check MongoDB Atlas IP whitelist (allow `0.0.0.0/0` for development)
- Ensure network connectivity

**Port already in use:**
- Change `PORT` in `.env` file
- Kill process using the port: `lsof -ti:5000 | xargs kill` (Mac/Linux)

**Module not found errors:**
- Run `npm install` to install dependencies
- Delete `node_modules` and `package-lock.json`, then reinstall

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- **Express.js**: Fast and minimalist web framework
- **MongoDB**: Flexible NoSQL database
- **Mongoose**: Elegant MongoDB object modeling
- **Node.js Community**: For excellent packages and resources

---
