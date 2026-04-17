# 🚗 PrestivaCars

**Full-stack mobile business application built with React Native and .NET Web API using CQRS architecture.**

---

## 📱 Overview

PrestivaCars is a mobile application designed for managing car-related business operations.

This project is focused on applying **real-world software engineering practices**, including:

* clean architecture
* CQRS pattern
* scalable backend design
* modern mobile development

---

## 🧱 Tech Stack

### 📱 Frontend

* React Native
* TypeScript
* React Navigation

### ⚙️ Backend *(in progress)*

* .NET Web API
* CQRS (Command Query Responsibility Segregation)
* MediatR *(planned)*
* Entity Framework Core *(planned)*

### 🐳 DevOps *(planned)*

* Docker
* Docker Compose

---

## 🏗️ Architecture

The backend is designed using the **CQRS pattern**:

* **Commands** → modify application state
* **Queries** → retrieve data

This separation improves:

* maintainability
* scalability
* testability

The project structure follows **clean architecture principles**:

* Presentation (mobile app)
* Application layer
* Domain layer
* Infrastructure layer

---

## ✨ Features

### ✅ Implemented

* React Native project setup
* Navigation using React Navigation
* TypeScript integration
* Clean initial structure

### 🚧 In Progress

* Backend API (.NET)
* CQRS implementation

### 🔜 Planned

* Authentication & authorization
* Car inventory management
* Booking system
* API integration
* Validation & error handling

---

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have completed the official React Native environment setup:
https://reactnative.dev/docs/set-up-your-environment

---

### ▶️ Start Metro

Start the React Native development server:

```bash
npm start
# or
yarn start
```

---

### 📱 Run the application

Open a new terminal and run:

#### Android

```bash
npm run android
# or
yarn android
```

#### iOS

```bash
# install pods (first time only)
bundle install
bundle exec pod install

npm run ios
# or
yarn ios
```

---

### 🔄 Development

* Edit `App.tsx` to start developing
* App will auto-reload using Fast Refresh
* Manual reload:

  * Android: press `R` twice or `Ctrl + M`
  * iOS: press `R`

---

### 🛠️ Troubleshooting

If you encounter issues, check:
https://reactnative.dev/docs/troubleshooting


---

## 📦 Project Structure (planned)

```
PrestivaCars/
│
├── mobile/                # React Native app
│   ├── screens/
│   ├── navigation/
│   └── components/
│
├── backend/               # .NET Web API
│   ├── Application/
│   ├── Domain/
│   ├── Infrastructure/
│   └── API/
│
└── docker/                # Docker setup
```

---

## 📈 Status

🚧 Project in progress — developed step by step.

---

## 🎯 Goal

The goal of this project is to build a **production-ready mobile application** using:

* React Native
* .NET Web API
* CQRS architecture
* Docker

---

## 👨‍💻 Author

**Tomasz Kej**
GitHub: https://github.com/TomashKej

---

## ⭐ Support

If you find this project interesting, consider giving it a star ⭐
