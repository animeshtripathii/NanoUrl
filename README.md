# LinkEngine 🔗 (NanoUrl)

<div align="center">

![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Deploy-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

**A full-stack, enterprise-ready URL shortener and click analytics platform built with Spring Boot, React, and MySQL.**

[Key Features](#-key-features) • [Tech Stack](#-tech-stack) • [Cloud Deployment](#-cloud-deployment) • [Local Setup](#-local-setup) • [API Documentation](#-api-documentation)

</div>

---

## 📌 Overview

**LinkEngine** is a modern, high-performance link management application. It enables users to convert long, cumbersome web addresses into clean, branded short links, manage user-specific link portfolios, track real-time click statistics, and visualize temporal performance metrics through interactive analytics dashboards.

---

## ✨ Key Features

- 🔐 **Secure Authentication**: User registration and login backed by Spring Security, BCrypt password hashing, and JWT tokens.
- ⚡ **URL Shortening**: Rapid generation of unique, collision-free short codes mapped to original URLs.
- 🔀 **Instant Redirection**: High-throughput short link redirection with real-time click event recording.
- 📊 **Interactive Analytics**: Visual click tracking powered by `Chart.js` and custom date-range filtering.
- 📂 **Personal Link Dashboard**: Full management suite for logged-in users to search, filter, copy, and audit active links.
- 🌐 **Cloud-Ready Architecture**: Configured out-of-the-box for **Vercel** (Frontend) and **Render** (Backend).

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS + Custom Dark Theme Design System
- **Charts**: Chart.js & React-Chartjs-2
- **Routing**: React Router DOM v7
- **Icons**: Google Material Symbols & Lucide Icons

### Backend
- **Framework**: Java 21 + Spring Boot 3
- **Security**: Spring Security + JWT (`jjwt-api`)
- **Persistence**: Spring Data JPA + Hibernate
- **Database**: MySQL 8+
- **Build Tool**: Apache Maven

---

## 🏗️ Architecture & Data Flow

```text
┌─────────────────────────┐          ┌───────────────────────────┐
│     React Frontend      │          │    Spring Boot Backend    │
│  (Deployed on Vercel)   │          │   (Deployed on Render)    │
│                         │          │                           │
│   - Landing & Auth UI   │  HTTP/   │   - JWT Auth Controllers  │
│   - Link Manager        │  JSON    │   - URL Shortener Service │
│   - Analytics Charts    │ ───────► │   - Click Track Filter    │
└─────────────────────────┘          └─────────────┬─────────────┘
                                                   │ JPA/Hibernate
                                                   ▼
                                     ┌───────────────────────────┐
                                     │      MySQL Database       │
                                     │                           │
                                     │   - Users Table           │
                                     │   - URL Mappings Table    │
                                     │   - Click Events Table    │
                                     └───────────────────────────┘
```

---

## ☁️ Cloud Deployment

### 1. Deploying Frontend to Vercel

The frontend includes a pre-configured `vercel.json` for SPA route rewrites.

1. Push code to GitHub and connect your repo to **Vercel**.
2. Set **Root Directory** to `frontend`.
3. Add Environment Variable:
   ```env
   VITE_API_BASE_URL=https://your-backend-url.onrender.com
   ```
4. Click **Deploy**.

---

### 2. Deploying Backend to Render

The repository includes a production multi-stage `Dockerfile` and `render.yaml` blueprint.

1. Create a Web Service on **Render** using the Docker runtime (points to `url-shortener-sb/Dockerfile`).
2. Add the following Environment Variables in Render:
   - `SPRING_DATASOURCE_URL` = `jdbc:mysql://<host>:<port>/<dbname>`
   - `SPRING_DATASOURCE_USERNAME` = `<your-db-username>`
   - `SPRING_DATASOURCE_PASSWORD` = `<your-db-password>`
   - `JWT_SECRET` = `<min-32-byte-base64-secret>`
3. Click **Deploy**.

---

## ⚙️ Local Setup

### Prerequisites
- **Java 21+**
- **Node.js 18+ & npm**
- **MySQL 8+**

---

### 1. Backend Setup

```bash
# Navigate to backend
cd url-shortener-sb

# Create MySQL database
mysql -u root -p -e "CREATE DATABASE linkengine;"

# Copy environment properties template
cp src/main/resources/application.properties.example src/main/resources/application.properties

# Run application
./mvnw spring-boot:run   # Linux/macOS
.\mvnw.cmd spring-boot:run  # Windows
```

The Spring Boot backend will run on `http://localhost:8080`.

---

### 2. Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The React frontend will run on `http://localhost:5173`.

---

## 🧪 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/public/register
Content-Type: application/json

{
  "username": "harmeet",
  "email": "harmeet@example.com",
  "password": "Password@123"
}
```

#### User Login
```http
POST /api/auth/public/login
Content-Type: application/json

{
  "username": "harmeet",
  "password": "Password@123"
}
```
*Returns JWT access token.*

---

### Protected URL Endpoints (`Authorization: Bearer <TOKEN>`)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/urls/shorten` | Create short code for a long URL |
| `GET` | `/api/urls/myurls` | Fetch all URLs created by logged-in user |
| `GET` | `/api/urls/analytics/{shortUrl}` | Get click events between `startDate` and `endDate` |

---

### Public Redirection

```http
GET /{shortUrl}
```
Redirects to original destination and records click telemetry.

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <sub>Built with ❤️ by <strong>Harmeet Singh</strong></sub>
</div>
