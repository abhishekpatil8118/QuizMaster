📚 Full-Stack Quiz Application

A full-stack Quiz Application built using Spring Boot, React, and MySQL.
The system supports Admin and User roles, dynamic quiz creation, automated evaluation, and secure RESTful communication.

🚀 Features
👤 Authentication & Authorization
Admin and User login
Role-based access control
Secure JWT-based authentication

🧑‍💼 Admin Panel
Create, update, and delete quiz questions
Create quizzes based on technology/domain
Set quiz duration and number of questions
View user quiz submissions and scores

👨‍🎓 User Panel
Register and login
Select technology-based quizzes
Attempt timed quizzes
View instant results after submission
Review submitted answers and scores

🧠 Quiz System
Dynamic quiz generation
Automated score calculation
Allowed to set number of questions per quiz
Stores user responses for review

🛠️ Tech Stack
1.Backend
Java 21
Spring Boot
MySQL

2.Frontend
React (Vite)
JavaScript
Bootstrap

🏗️ Layered Architecture
Controller Layer
Service Layer
Repository Layer
RESTful APIs for frontend-backend communication
Clean and maintainable code structure

⚙️ Project Setup
1.Backend Setup
Clone the repository
Open backend project in IDE (IntelliJ / Eclipse)
Configure application.properties:
spring.datasource.url=jdbc:mysql://localhost:3306/quiz_db
spring.datasource.username=root
spring.datasource.password=your_password
Run the Spring Boot application

2.Frontend Setup
Navigate to frontend folder
Install dependencies:
npm install
Start development server:
npm run dev

📊 Database
MySQL is used as the relational database
JPA handles ORM and entity mapping
Tables include Users, Roles, Quizzes, Questions, Attempts, Answers

🔐 API Security
JWT token-based authentication
Secured endpoints using Spring Security
Token stored and sent via Axios interceptor

📌 Future Enhancements
Question difficulty levels
Quiz leaderboard
Pagination and search
Result analytics
Email notifications

👨‍💻 Author
Abhishek Patil
Tejas Patil
