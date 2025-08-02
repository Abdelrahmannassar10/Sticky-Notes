# 📒 Sticky Notes API

This is a secure, JWT-authenticated Notes API built with **Node.js**, **Express**, **MongoDB**, and **Mongoose**. It supports user registration, login, and full CRUD operations for notes, along with pagination, sorting, and content-based searching.

---

## ✅ Technologies Used

* Node.js
* Express.js
* MongoDB with Mongoose
* JSON Web Token (JWT)
* dotenv
* bcrypt

---

## 📁 Project Setup

```bash
git clone <your-repo-url>
cd <your-project-folder>
npm install
npm install dotenv
npm i jsonwebtoken
npm i bcrypt  
```

### 🔐 Create a `.env` file

```env
JWT_SECRET=
```

Then run the server:

```bash
npm start
```

---

## 🔑 Authentication

All protected routes require a valid JWT in the `Authorization` header:

```http
Authorization: Bearer <token>
```

---

## 📌 API Endpoints

### 👤 User Routes

| Method | Endpoint          | Description           |
| ------ | ----------------- | --------------------- |
| POST   | `/users/signup`   | Register a new user   |
| POST   | `/users/login`    | Login and get a token |
| PUT    | `/users/update`   | Update user info      |
| DELETE | `/users/delete`   | Delete logged-in user |
| GET    | `/users/get-user` | Get current user info |

---

### 📝 Notes Routes

| Method | Endpoint                              | Description                                  |
| ------ | ------------------------------------- | -------------------------------------------- |
| POST   | `/notes/create`                       | Create a new note                            |
| PUT    | `/notes/update/:noteId`               | Update a note (title + content)              |
| PUT    | `/notes/replace/:noteId`              | Replace a note (can include new userId)      |
| PUT    | `/notes/update-all`                   | Update all notes for the current user        |
| DELETE | `/notes/delete/:noteId`               | Delete a specific note                       |
| DELETE | `/notes/delete-all`                   | Delete all notes for the current user        |
| GET    | `/notes/paginate-sort?page=1&limit=5` | Paginated & sorted notes (by createdAt desc) |
| GET    | `/notes/get/:noteId`                  | Get a specific note by ID                    |
| GET    | `/notes/get-by-content?content=...`   | Get notes matching specific content          |
| GET    | `/notes/note-with-user`               | Get all notes with user email (populated)    |
| GET    | `/notes/get-by-title?title=...`       | Get notes by title with user name & email    |

---

## 📬 Postman Collection

🔗 [Open Postman Collection](https://documenter.getpostman.com/view/42935483/2sB3BALsXV)

> Replace the token in headers for protected routes:

```http
Authorization: Bearer <your-jwt-token>
```

---

## 👤 Author

**Abdelrahman Nassar**
📧 [atef18008@gmail.com](mailto:atef18008@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/Abdelrahman-Nassar-dev253)
🐳 [GitHub](https://github.com/Abdelrahmannassar10)

---

## 🕒 Last Updated

📅 August 1, 2025
