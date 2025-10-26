# Product CRUD API

> A clean and modern RESTful API built with Express.js and MongoDB. Perfect starter template for building scalable Node.js backends.

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v4.x-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## ✨ Features

- 📦 Full CRUD operations for products
- 🎯 MVC architecture with clean separation of concerns
- 🛡️ Comprehensive error handling
- ⚡ Fast and lightweight with Express.js
- 🗄️ MongoDB Atlas integration with Mongoose ODM
- 🔐 Environment-based configuration
- ⏱️ Automatic timestamps for all records

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

# Create .env file
echo "PORT=5000\nMONGODB_PASSWORD=your_password_here" > .env

# Start the server
npm start
```

The API will be running at `http://localhost:5000`

## 📖 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Get all products |
| `GET` | `/api/products/:id` | Get single product |
| `POST` | `/api/products` | Create new product |
| `PUT` | `/api/products/:id` | Update product |
| `DELETE` | `/api/products/:id` | Delete product |

### Example Request

```bash
# Create a product
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "quantity": 15,
    "price": 999.99,
    "image": "https://example.com/laptop.jpg"
  }'
```

### Example Response

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

## 📁 Project Structure

```
product-crud-api/
├── controller/
│   └── product.controller.js    # Business logic
├── models/
│   └── product.model.js          # Mongoose schema
├── routes/
│   └── product.route.js          # API routes
├── config.js                     # Environment config
├── index.js                      # App entry point
└── .env                          # Environment variables
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_PASSWORD=your_mongodb_password
```

## 🗄️ Data Schema

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

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose ODM
- **Config:** dotenv, envalid
- **Architecture:** MVC Pattern

## 🎯 Roadmap

- [ ] JWT authentication & authorization
- [ ] Request validation with Joi
- [ ] Pagination & filtering
- [ ] Image upload (Cloudinary/S3)
- [ ] Rate limiting
- [ ] Unit & integration tests
- [ ] Docker support
- [ ] API documentation (Swagger)

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Built with [Express.js](https://expressjs.com/), [MongoDB](https://www.mongodb.com/), and [Mongoose](https://mongoosejs.com/)

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/YOUR_USERNAME">Your Name</a>
</div>
