# 🧱 Form Builder (Frontend)

A frontend-only form builder application built with React.  
The project demonstrates a scalable frontend architecture, authentication with access/refresh tokens, and API mocking using OpenAPI and MSW.

---

## 🚀 Features

- 🔐 Authentication using **access & refresh tokens**
- 📄 API integration based on **OpenAPI specification**
- 🧪 Mocked backend using **Mock Service Worker (MSW)**
- 🧱 Scalable **Evolution Design architecture** and architectural boundaries with **eslint-boundaries plugin**
- 📱 Fully **responsive UI** with Tailwind CSS
- 🧭 Client-side routing with React Router

---

## 🛠️ Tech Stack

- **React**
- **React Router**
- **TypeScript**
- **Tailwind CSS**
- **MSW (Mock Service Worker)**
- **OpenAPI**
- **Vite** (or CRA — adjust if needed)

---

## 🧠 Architecture

The project is structured using **Evolution Design architecture**, allowing the codebase to evolve from simple to complex without early overengineering.

### Key principles:
- Gradual separation of concerns
- Clear module boundaries
- Easy refactoring as requirements grow
- Feature-oriented structure

Example structure:

```text
src/
├── app/            # App initialization, routing, providers
├── features/       # Individual independent features with self architecture
├── shared/         # UI kit, hooks, utils, api clients, config
```