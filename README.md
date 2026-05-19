# User Authentication System

A robust authentication system built with TypeScript, Node.js, Express, PostgreSQL, and EJS. This project is designed using **Clean Architecture**, **Object-Oriented Programming (OOP)** principles, **SOLID principles**, and the **Repository Pattern** to create a scalable and maintainable codebase.

---

## 🚀 Features

### User Module
- User registration
- User login
- User logout
- Session-based authentication
- Password hashing with bcrypt
- Protected home page
- Prevent access to login/register pages after authentication
- Browser back-button protection after logout

### Admin Module
- Admin login and logout
- View all users
- Block and unblock users
- Automatically log out blocked users

---

## 🛠️ Technologies Used

- TypeScript
- Node.js
- Express.js
- PostgreSQL
- EJS
- express-session
- bcrypt
- dotenv

---

## 🏗️ Architectural Patterns Used

### Clean Architecture
The application is divided into layers with clear responsibilities:

- **Presentation Layer** – Routes, Controllers, Views
- **Application Layer** – Use Cases (Business Logic)
- **Domain Layer** – Interfaces and Entities
- **Infrastructure Layer** – Repository Implementations and Database Access

### Repository Pattern
Database access is abstracted through interfaces. Use cases depend on abstractions instead of concrete implementations.

### Dependency Injection
Repositories are injected into use cases, making the code loosely coupled and easy to test.

### SOLID Principles
The project follows all five SOLID principles to keep the code maintainable and extensible.

### Object-Oriented Programming (OOP)
Uses:
- Classes
- Objects
- Encapsulation
- Abstraction
- Inheritance (where needed)
- Polymorphism (through interfaces)

---

## 🔄 Application Flow

```text
HTTP Request
   ↓
Routes
   ↓
Controller
   ↓
Use Case (Business Logic)
   ↓
Repository Interface (Domain Layer)
   ↓
Repository Implementation (Infrastructure Layer)
   ↓
PostgreSQL Database