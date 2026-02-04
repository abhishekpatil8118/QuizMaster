# 📚 Full-Stack Quiz Application

A full-stack Quiz Application built using **Spring Boot**, **React**, and **MySQL**.  
The system supports **Admin and User roles**, dynamic quiz creation, automated evaluation, and secure RESTful communication.

---

## 🚀 Features

### 👤 Authentication & Authorization
- Admin and User login
- Role-based access control
- Secure JWT-based authentication

### 🧑‍💼 Admin Panel
- Create, update, and delete quiz questions
- Create quizzes based on technology/domain
- Set quiz duration and number of questions
- View user quiz submissions and scores

### 👨‍🎓 User Panel
- Register and login
- Select technology-based quizzes
- Attempt timed quizzes
- View instant results after submission
- Review submitted answers and scores

### 🧠 Quiz System
- Dynamic quiz generation
- Automated score calculation
- Allowed to set number of questions per quiz
- Stores user responses for review

---

## 🛠️ Tech Stack

### Backend
- Java 21
- Spring Boot
- MySQL

### Frontend
- React (Vite)
- JavaScript
- Bootstrap

---

## 🏗️ Layered Architecture
- Controller Layer
- Service Layer
- Repository Layer
- RESTful APIs for frontend-backend communication
- Clean and maintainable code structure

---

## ⚙️ Project Setup

### Backend Setup
1. Clone the repository
2. Open backend project in IDE (IntelliJ / Eclipse)
3. Configure `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/quiz_db
   spring.datasource.username=root
   spring.datasource.password=your_password
