# 👥 StaffHub — Employee Data Hub

[![React](https://img.shields.io/badge/React-18.2.0-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![React Router](https://img.shields.io/badge/React_Router-v6-ca4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Storage](https://img.shields.io/badge/Storage-LocalStorage-f59e0b?style=for-the-badge&logo=html5&logoColor=white)](#-why-localstorage--no-backend)
[![Architecture](https://img.shields.io/badge/Architecture-Offline--First-10b981?style=for-the-badge&logo=pwa&logoColor=white)](#-architecture--data-layer)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

> A modern, high-performance employee directory and workforce management dashboard. Designed with an offline-first architecture powered by browser `localStorage` persistence, instant live search, department filtering, and a bespoke glassmorphism dark theme.

---

## 🌐 Live Demo

🔗 **[Launch Live Application](https://sakshxxmm.github.io/Employee-Data_Hub/)**

*Because StaffHub is 100% client-side with persistent LocalStorage, the live demo works instantly with zero server cold starts, database configuration, or latency.*

---

## 💡 Why LocalStorage & No Backend?

> **Interview & Architectural Deep Dive**  
> *"Why does this application use LocalStorage instead of a traditional Express / MongoDB backend?"*

This architecture is a **deliberate engineering choice** prioritizing user experience, zero-friction evaluation, and clean code separation:

1. **Zero-Friction Review & Instant Deployment**  
   Evaluators, recruiters, and interviewers can clone the repository and run `npm start`—or simply open the live demo link—without having to configure MongoDB Atlas connection strings, whitelist IP addresses, or maintain concurrent backend processes.

2. **Offline-First & Sub-Millisecond Latency**  
   All read, write, update, and delete actions execute locally in memory and persist into browser `localStorage`. This yields instantaneous UI transitions, zero network spinners, and complete offline resilience.

3. **Clean Architecture & Service Abstraction (`employeeService.js`)**  
   UI components do not touch `localStorage` directly. All data mutations flow through a dedicated service layer that implements asynchronous `Promise`-based REST-like contracts (`getAllEmployees`, `getEmployeeById`, `createEmployee`, `updateEmployee`, `deleteEmployee`).  
   **Design benefit:** If a cloud REST or GraphQL API is introduced in the future, only the service layer needs to be adapted—**zero component logic requires rewriting**.

4. **Session Persistence with Safe Seeding**  
   The application pre-populates a realistic 6-member cross-functional team on first launch. Any employee edits, additions, or deletions persist across browser reloads, tab switches, and sessions. A built-in **"Reset Demo Data"** action allows reviewers to restore default records with one click.

5. **Client-Side Data Privacy**  
   Directory data remains entirely confined to the browser sandbox, showcasing local state governance without transmitting personal information over external networks.

---

## ✨ Key Features

- **⚡ Full CRUD Operations**: Create new employees, view profiles, update roles and departments, or remove team members with optimistic UI updates.
- **🔍 Instant Search & Multi-Field Filtering**: Real-time filtering across names, emails, job titles, departments, and roles with zero lag.
- **🏷️ Department Category Selector**: Dynamically populated department filter dropdown with live matching counters.
- **📊 Real-time Metric Cards**: Live indicators for Total Team Members, Active Departments, and Filtered Records.
- **🛡️ Delete Confirmation Modal**: Custom safety modal preventing accidental deletions with keyboard accessibility and backdrop dismiss.
- **🔄 One-Click Demo Reset**: Dedicated toolbar button to instantly restore the curated demo roster.
- **🎨 Bespoke Design System**: Custom HSL-tailored dark theme with subtle neon accents, glassmorphic cards, custom role badges, and shimmer skeleton loaders.
- **📱 Fully Responsive**: Seamless experience across mobile screens, tablets, and wide-format desktop monitors.
- **🔗 Deep Link Resilience**: Utilizes `HashRouter` to prevent `404 Not Found` errors when refreshing routes on static hosts like GitHub Pages.

---

## 🏗️ Project Architecture

```
Employee-Data_Hub/
├── public/
│   ├── favicon.ico          # Application favicon
│   ├── index.html           # HTML5 entrypoint with Google Fonts (Inter)
│   ├── manifest.json        # Web app manifest
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── EmployeeForm.js      # Controlled creation form with validation
│   │   └── EditEmployeeForm.js  # Pre-populated edit form with state sync
│   ├── pages/
│   │   ├── HomePage.js          # Main dashboard (directory, metrics, toolbar, modal)
│   │   ├── CreateEmployeePage.js# Add employee page with split hero banner
│   │   └── EditEmployee.js      # Edit profile page container
│   ├── services/
│   │   └── employeeService.js   # LocalStorage data access layer & mock seed
│   ├── App.js                   # Application routing configuration
│   ├── index.css                # Custom CSS design system (tokens, glassmorphism, animations)
│   └── index.js                 # React root mount with HashRouter
├── package.json                 # Project dependencies and deployment scripts
├── tailwind.config.js           # Tailwind utility integrations
└── README.md                    # Project documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v16.x or higher)
- npm (v8.x or higher)

### Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sakshxxmm/Employee-Data_Hub.git
   cd Employee-Data_Hub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Core** | React 18.2 | Component-driven UI development |
| **Routing** | React Router DOM v6 (`HashRouter`) | Client-side routing with static hosting compatibility |
| **Forms** | React Hook Form | High-performance, un-opinionated form validation |
| **Storage Layer** | LocalStorage Web API | Persistent browser-level data store |
| **Styling** | Custom CSS3 + TailwindCSS | Design tokens, animations, responsive grid & flexbox |
| **Icons & Media** | Heroicons SVG / UI-Avatars | Scalable vector graphics and dynamic initial avatars |

---

## 🧪 Interview Quick Reference: How to Walk Through the Code

When demonstrating this project in an interview:

1. **Start with the Directory (`HomePage.js`)**:
   - Highlight the dynamic stats counters and the real-time search/department filter.
   - Mention the **optimistic UI updates** during deletion: the row disappears instantly before awaiting confirmation.
2. **Show the Data Layer (`src/services/employeeService.js`)**:
   - Explain how `employeeService` encapsulates all LocalStorage reads and writes.
   - Point out that methods return `Promise` instances with micro-delays (100ms) to ensure smooth skeleton transitions and maintain API contract parity with a real REST endpoint.
3. **Show Form Handling (`EmployeeForm.js` & `EditEmployeeForm.js`)**:
   - Demonstrate `react-hook-form` validation, error messaging, and form state pre-population when switching between edit modes.
4. **Demonstrate Persistence**:
   - Add a new employee or delete one, reload the page, and show that state persists.
   - Click **"Reset Demo Data"** to show how easy it is to test and reset.

---

## 👤 Author

**Saksham**  
- GitHub: [@sakshxxmm](https://github.com/sakshxxmm)  
- Repository: [Employee-Data_Hub](https://github.com/sakshxxmm/Employee-Data_Hub)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
