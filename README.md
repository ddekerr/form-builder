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

## 📦 Installation Guide

### Prerequisites

Make sure you have installed:

- Node.js >= 18
- npm or pnpm
- Git

Check versions:

```bash
node -v
npm -v
git --version
```

### Clone the repository

```bash
git clone https://github.com/ddekerr/form-builder.git
cd form-builder
```

### Install dependencies

```bash
npm install
```

### Generate API client (OpenAPI)

For mocking reuest in browser

```bash
npm run api
```

### Start the development server

```bash
npm run dev
```

## 🚀 Future Plans

Here’s what we plan to add or improve in the future:

- [ ] Add form builder tool with many type of fields
- [ ] Add drag-and-drop form builder
- [ ] Add custom validation for every type of fields
- [ ] Save filled forms to database
- [ ] Add different shared links to every form with estimated rules
- [ ] Extend filter component
- [ ] Write unit and integration tests
- [ ] Add dark mode support
