# 👥 StaffHub — Employee Data Hub

> A modern, high-performance employee directory and workforce management dashboard. Designed with an offline-first architecture powered by browser `localStorage` persistence, instant live search, department filtering, and a bespoke glassmorphism dark theme.

---

## 🌐 Live Demo

🔗 **[Launch Live Application](https://sakshxxmm.github.io/Employee-Data_Hub/)**

*Because StaffHub is 100% client-side with persistent LocalStorage, the live demo works instantly with zero server cold starts, database configuration, or latency.*

---

---

## ✨ Key Features

- **⚡ Full CRUD Operations**: Create new employees, view profiles, update roles and departments, or remove team members with optimistic UI updates.
- **🔍 Instant Search & Multi-Field Filtering**: Real-time filtering across names, emails, job titles, departments, and roles with zero lag.
- **🏷️ Department Category Selector**: Dynamically populated department filter dropdown with live matching counters.
- **📊 Real-time Metric Cards**: Live indicators for Total Team Members, Active Departments, and Filtered Records.
- **🛡️ Delete Confirmation Modal**: Custom safety modal preventing accidental deletions with keyboard accessibility and backdrop dismiss.
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
│   │   └── employeeService.js   # LocalStorage data access layer
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
| **Icons & SVG** | Heroicons SVG | Clean, scalable vector interface icons |

---


---

## 👤 Author

**Saksham**  
- GitHub: [@sakshxxmm](https://github.com/sakshxxmm)  
- Repository: [Employee-Data_Hub](https://github.com/sakshxxmm/Employee-Data_Hub)
