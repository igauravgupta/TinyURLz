
# 🔗 TinyURLz

**TinyURLz** is a powerful and easy-to-use URL shortener designed to turn long, messy links into clean, concise URLs. Whether you're sharing on social media, managing marketing campaigns, or just want a neater way to send links, TinyURLz makes it simple and efficient.

---

## 📁 Project Structure
```
TinyURLz/
├── frontend/ # React + Vite frontend
└── backend/ # Node.js + Express backend
    ├── src/
    │ ├── config/ # Environment and DB configuration
    │ ├── middlewares/ # Custom Express middlewares (auth, error handling)
    │ ├── models/ # Mongoose models for MongoDB
    │ ├── modules/ # Feature modules
    │ │ ├── auth/ # Login, register, JWT logic
    │ │ ├── shortUrl/ # URL shortening logic
    │ │ └── user/ # User profile & management
    │ └── utils/ # Helper utilities (validators, etc.)
    ├── app.js # Entry point for Express app
    ├── routes.js # Top-level route handler
    ├── Dockerfile # Docker config
    ├── .env.sample # Sample environment config

```
---

## 🚀 Tech Stack

### Frontend
- **React** (with [Vite](https://vitejs.dev/) for fast development)
- Tailwind CSS
- Axios

### Backend
- **Node.js** with **Express**
- MongoDB (via **Mongoose**)
- JWT for authentication
- Docker (optional for deployment)

---

## 🔧 Backend Setup

1. Navigate to the backend folder & Install dependencies :
   ```bash
    cd backend
    npm install
    ```
2. Create an .env file (refer to .env.sample):
    ```bash
    PORT=8000
    NODE_ENV=development
    ORIGIN=http://localhost:3000
    MONGO_URI=mongodb://localhost:27017/TinyURLz
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRATION=1h
    APP_URL=http://localhost:8000/
    ```
3. Run the server:
    ```bash
    npm start
    ```


## 🎨 Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a .env file:
    ```bash
    VITE_API_URL=http://localhost:5000
    ```
4. Run the frontend:
    ```bash
    npm run dev
    ```
## 🐳 Docker Setup (Optional)
1. Build and run backend using Docker:
    ```bash
    docker build -t TinyURLz-backend .
    docker run -p 5000:5000 --env-file .env TinyURLz-backend
    ```
## 📌 Features
1. User authentication with JWT
2. URL shortening with custom or auto aliases
3. Short URL redirection
4. Link tracking
5. Middleware-driven architecture
6. Clean and modular code structure


## 🤝 Contributing
Want to help improve TinyURLz? 
Feel free to fork, submit issues, or open pull requests!
