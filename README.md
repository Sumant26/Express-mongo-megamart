# 🚀 Express Mongo MegaMart (Node.js + Express + MongoDB + Redis)

A powerful, production-styled REST API built using Node.js, Express, MongoDB, JWT Authentication, Redis caching, and a complete MVC architecture.

This project is designed for developers who want to learn MongoDB from beginner → advanced, along with professional backend patterns.

This project demonstrates how professional APIs are built, including:

# Project Structure
    express-mongo-megamart/
    │
    ├── package.json                     # Project metadata & dependencies
    ├── server.js                        # App entry point
    ├── .env                             # Environment variables
    ├── .gitignore
    │
    ├── logs/                            # Central Winston logs
    │   ├── info.log
    │   ├── error.log
    │   └── .gitkeep
    │
    ├── docs/                            # API documentation (Swagger/Postman)
    │   └── megamart.postman_collection.json
    │
    ├── tests/                           # Jest + Supertest tests (In-memory MongoDB)
    │   ├── auth.test.js
    │   ├── product.test.js
    │   └── user.test.js
    │
    ├── scripts/                         # Developer / DevOps scripts
    │   ├── seed.js                      # Seed DB with sample products/users
    │   └── backup.js                    # MongoDB backup script
    │
    ├── docker/
    │   ├── Dockerfile                   # Build container image
    │   └── docker-compose.yml           # Multi-service orchestration (API + Mongo + Redis)
    │
    └── src/
        ├── app.js                       # Initializes app, middleware, and routes
        │
        ├── routes/
        │   ├── auth.routes.js
        │   ├── user.routes.js
        │   ├── product.routes.js
        │   └── order.routes.js
        │
        ├── controllers/
        │   ├── auth.controller.js
        │   ├── user.controller.js
        │   ├── product.controller.js
        │   └── order.controller.js
        │
        ├── models/
        │   ├── user.model.js
        │   ├── product.model.js
        │   └── order.model.js
        │
        ├── validation/                  # Joi validation schemas
        │   ├── auth.validation.js
        │   ├── user.validation.js
        │   └── product.validation.js
        │
        ├── config/
        │   ├── db.js                    # MongoDB connection
        │   ├── redis.js                 # Redis caching (optional)
        │   ├── logger.js                # Winston logger config
        │   └── security.js              # Helmet, rate limit, CORS
        │
        ├── middlewares/
        │   ├── auth.middleware.js       # JWT authentication
        │   ├── admin.middleware.js      # Admin role protection
        │   ├── error.middleware.js      # Global error handler
        │   └── validate.middleware.js   # Celebrate request validation
        │
        ├── utils/
        │   ├── token.utils.js           # JWT create/verify helpers
        │   ├── response.utils.js        # Standard API response formatting
        │   ├── morgan.utils.js          # Morgan + Winston HTTP logger
        │   └── cache.utils.js           # Redis cache wrapper
        │
        ├── constants/
        │   └── messages.js              # Centralized success/error messages
        │
        └── services/
            ├── user.service.js
            ├── product.service.js
            └── order.service.js         # Business logic only

⚙️ Setup Instructions

Follow these steps to run the project locally.

1️⃣ Clone the Repository
git clone https://github.com/Sumant26/express-mongo-megamart.git
cd express-mongo-megamart

2️⃣ Install Dependencies
npm install

3️⃣ Create .env File

Copy .env.example and fill the values:
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/megamart
JWT_SECRET=your_secret_here
JWT_EXPIRES_IN=1d

# Redis (optional)
REDIS_URL=redis://localhost:6379

NODE_ENV=development

4️⃣ Start the API
npm run dev

Visit:
http://localhost:4000

# 💡 Features

✅ Node.js + Express (ES6 modules)
✅ MongoDB + Mongoose CRUD operations
✅ JWT Authentication (Register/Login)
✅ User Roles → Admin / User
✅ Redis caching (Optional)
✅ Celebrate (Joi) input validation
✅ Proper MVC architecture
✅ Logger (Morgan + Winston)
✅ Global error handler
✅ Docker support (API + MongoDB + Redis)
✅ In-memory MongoDB for tests

# 🛡 Security Layer

Includes:

🔐 JWT Authentication
📌 Password hashing (bcryptjs)
🛡 Helmet security headers
🚫 Rate limiting
⛔ CORS configuration
🚫 XSS-clean filtering
📦 Sanitized requests

# 📌 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | `/api/auth/register` | Create new user         |
| POST   | `/api/auth/login`    | Login & get JWT         |
| GET    | `/api/auth/me`       | Get logged-in user info |

### 👤 User Routes

| Method | Endpoint         | Description                |
| ------ | ---------------- | -------------------------- |
| GET    | `/api/users`     | Get all users (admin only) |
| GET    | `/api/users/:id` | Get user by ID             |
| PUT    | `/api/users/:id` | Update user                |
| DELETE | `/api/users/:id` | Delete user                |

### 🛒 Product Routes

| Method | Endpoint            | Description            |
| ------ | ------------------- | ---------------------- |
| GET    | `/api/products`     | Get all products       |
| GET    | `/api/products/:id` | Get product by ID      |
| POST   | `/api/products`     | Create product (admin) |
| PUT    | `/api/products/:id` | Update product         |
| DELETE | `/api/products/:id` | Delete product         |

### 📦 Order Routes

| Method | Endpoint               | Description        |
| ------ | ---------------------- | ------------------ |
| POST   | `/api/orders`          | Create order       |
| GET    | `/api/orders/user/:id` | User orders        |
| GET    | `/api/orders`          | All orders (admin) |



# 🧪 Testing (Jest + Supertest + In-Memory MongoDB)

Run tests:
npm test

Tests include:
✔ Auth tests
✔ User tests
✔ Product tests
✔ Order tests

# 🐳 Docker Support

Start API + MongoDB + Redis using:

docker-compose up --build

# 🧰 Technologies Used

Node.js
Express.js
MongoDB + Mongoose
Redis (optional caching)
ES6 modules
JWT Authentication
Celebrate (Joi validation)
Helmet (security)
Winston + Morgan (logging)
Jest + Supertest (testing)
Docker

## 🌱 Seed Database

    node seed/seedProducts.js

# 🧑‍💻 Author
Sumant Tulshibagwale
GitHub: https://github.com/Sumant26


