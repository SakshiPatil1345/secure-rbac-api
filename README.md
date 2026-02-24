Secure RBAC API

A scalable REST API with JWT Authentication and Role-Based Access Control (RBAC), built using Node.js, Express, MongoDB, and React.js.

🚀 Features

User Registration & Login

JWT Authentication

Role-Based Access (User / Admin)

Protected Routes

CRUD Operations for Tasks

Basic React Frontend

Postman API Documentation

🛠 Tech Stack

Backend: Node.js, Express, MongoDB, JWT, bcrypt
Frontend: React.js, Axios
Tools: Postman, GitHub

⚙️ Setup Instructions

1️⃣ Clone Repo
git clone <repo-url>
cd secure-rbac-api
npm install

2️⃣ Create .env File
PORT=8000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

3️⃣ Start Backend
npm start

4️⃣ Start Frontend
cd frontend
npm install
npm start


📌 API Endpoints
Auth

POST /api/v1/auth/register

POST /api/v1/auth/login

Tasks (Protected)

GET /api/v1/tasks

POST /api/v1/tasks

PUT /api/v1/tasks/:id

DELETE /api/v1/tasks/:id

🔐 Authorization

JWT-based authentication

Users can manage their own tasks

Admin can access all tasks

📄 API Documentation

Postman Collection included:

secure-rbac-api.postman_collection.json
📈 Scalability Notes

Modular architecture (controllers, routes, middleware)

Stateless JWT authentication

Easily extendable to microservices

Can integrate Redis, Docker, Load Balancing

Developed by Sakshi Patil
