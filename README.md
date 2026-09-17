# NanoURL 🔗

<div align="center">

![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon_DB-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Deploy-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

**A high-contrast, glassmorphic full-stack URL shortener & click analytics platform powered by Spring Boot, React, and Neon DB (Free Serverless PostgreSQL).**

[Key Features](#-key-features) • [Tech Stack](#-tech-stack) • [Neon DB Setup](#-neon-db-postgresql-setup) • [Cloud Deployment](#-cloud-deployment) • [API Documentation](#-api-documentation)

</div>

---

## 📌 Overview

**NanoURL** is a high-performance link management platform. It enables users to convert long web addresses into clean short links, track real-time click statistics with interactive Chart.js graphs, and manage link portfolios with a dark glassmorphic UI.

---

## ✨ Key Features

- 🔐 **Secure Authentication**: User registration and login backed by Spring Security, BCrypt password hashing, and JWT tokens.
- ⚡ **URL Shortening**: Rapid generation of unique, collision-free short codes mapped to original URLs.
- 🔀 **Instant Redirection**: High-throughput short link redirection with real-time click event recording.
- 📊 **Interactive Analytics**: Visual click tracking powered by `Chart.js` and custom date-range filtering.
- 🐘 **Neon DB Powered**: Native serverless PostgreSQL integration (Neon DB Free Tier).
- 🎨 **Sleek Black & White Glassmorphic UI**: Premium high-contrast dark theme with frosted glass effects.
- 🌐 **Cloud Ready**: Pre-configured for **Vercel** (Frontend) and **Render** (Backend).

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS + Custom Black & White Glassmorphism Design System
- **Charts**: Chart.js & React-Chartjs-2
- **Routing**: React Router DOM v7
- **Icons**: Google Material Symbols

### Backend
- **Framework**: Java 21 + Spring Boot 3
- **Security**: Spring Security + JWT (`jjwt-api`)
- **Persistence**: Spring Data JPA + Hibernate
- **Database**: Neon DB (Serverless PostgreSQL) / MySQL
- **Build Tool**: Apache Maven

---

## 🐘 Neon DB (PostgreSQL) Setup

NanoURL is configured out-of-the-box to use **[Neon.tech](https://neon.tech/)** (Free Serverless PostgreSQL):

1. Sign up for a free account at **[Neon.tech](https://neon.tech/)** and create a new project (e.g. `nanourl-db`).
2. Copy your **PostgreSQL Connection String** from the Neon Dashboard:
   ```text
   postgres://alex:Password123@ep-cool-mountain-12345.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
3. Convert it to JDBC format for Spring Boot:
   ```text
   jdbc:postgresql://ep-cool-mountain-12345.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
4. Set the following environment variables on your deployment host (Render / Local):
   - `SPRING_DATASOURCE_URL` = `jdbc:postgresql://ep-cool-mountain-12345.us-east-2.aws.neon.tech/neondb?sslmode=require`
   - `SPRING_DATASOURCE_USERNAME` = `alex`
   - `SPRING_DATASOURCE_PASSWORD` = `Password123`

---

## ☁️ Cloud Deployment Guide

### 1. Backend on Render (Spring Boot)
1. Create a Web Service on **Render** using the Docker runtime (`url-shortener-sb/Dockerfile`).
2. Add Environment Variables:
   - `SPRING_DATASOURCE_URL`: Your Neon DB JDBC URL.
   - `SPRING_DATASOURCE_USERNAME`: Your Neon DB user.
   - `SPRING_DATASOURCE_PASSWORD`: Your Neon DB password.
   - `JWT_SECRET`: Base64 secret key (minimum 32 bytes).
3. Copy your live backend service URL (e.g., `https://nanourl-api.onrender.com`).

### 2. Frontend on Vercel (React)
1. Import repository on **Vercel**.
2. Set **Root Directory** to `frontend`.
3. Add Environment Variable:
   - `VITE_API_BASE_URL` = `https://nanourl-api.onrender.com`
4. Click **Deploy**.

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

---

### Protected Endpoints (`Authorization: Bearer <TOKEN>`)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/urls/shorten` | Create short code for long URL |
| `GET` | `/api/urls/myurls` | Fetch URLs belonging to logged-in user |
| `GET` | `/api/urls/analytics/{shortUrl}` | Get click analytics data |

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <sub>Built with ❤️ by <strong>Harmeet Singh</strong></sub>
</div>
