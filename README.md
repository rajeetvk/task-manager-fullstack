# 📝 Task Manager - Full Stack Web Application

A secure full-stack task management application built using Node.js, Express, MySQL, and JWT authentication.  
This project demonstrates user authentication, protected routes, password hashing, and CRUD operations with a clean modular architecture.

---

## 🚀 Tech Stack

### Backend
- Node.js
- Express.js
- MySQL
- JSON Web Token (JWT)
- Bcrypt (Password Hashing)

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript (ES6+)

---

## 🔐 Features

- User Signup & Login
- Secure JWT-based Authentication
- Password hashing using bcrypt
- Protected API routes using middleware
- Create Tasks
- View All Tasks (User-specific)
- Delete Tasks
- Token-based session handling (localStorage)
- Modular backend architecture
- Input validation middleware
- Clean dashboard layout

---

## 🏗️ Project Architecture


taskmanager/
│
├── db/
│ └── db.js
│
├── routes/
│ ├── authroutes.js
│ ├── taskroutes.js
│ └── userroutes.js
│
├── middleware/
│ ├── authmiddleware.js
│ ├── validateemail.js
│ └── validatepassword.js
│
├── public/
│ ├── signup.html
│ ├── login.html
│ ├── dashboard.html
│ ├── script.js
│ └── style.css
│
├── server.js
├── package.json
└── .gitignore


---

## ⚙️ How To Run Locally

1. Clone the repository:


git clone https://github.com/your-username/task-manager-fullstack.git


2. Navigate into the project folder:


cd task-manager-fullstack


3. Install dependencies:


npm install


4. Create a `.env` file in the root directory:


SECRET_KEY=your_secret_key_here


5. Make sure MySQL is running and create a database named:


taskmanager


6. Start the server:


node server.js


7. Open in browser:


http://localhost:5000/signup.html


---

## 📌 Key Concepts Implemented

- RESTful API design
- Middleware-based route protection
- JWT token verification
- Secure password storage using hashing
- User-specific data isolation
- Modular backend structure
- Asynchronous programming with async/await
- Client-side token management

---

## 🎯 Purpose of the Project

This project was built to strengthen understanding of:

- Backend development using Node.js
- Authentication and authorization mechanisms
- Database integration with MySQL
- Full-stack request-response flow
- Secure coding practices

---

## 👨‍💻 Author

Arjeet Singh  
Aspiring Backend / Full Stack Developer