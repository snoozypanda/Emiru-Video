# 🎥 Emiru Video Rentals

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Shadcn UI](https://img.shields.io/badge/UI-Shadcn_UI-000000?style=flat-square&logo=shadcnui)](https://ui.shadcn.com/)

**Emiru Video Rentals** is a high-performance, premium web application designed for managing professional video equipment rentals, client databases, and rental schedules. Built with a modern tech stack focused on speed, type safety, and aesthetic excellence.

---

## ✨ Key Features

- **🎥 Advanced Inventory Management**: A visual grid-based system for tracking cameras, lighting, and sound gear with intuitive quantity controls.
- **👥 Comprehensive Client Database**: Searchable and filterable member list with real-time status updates (Active/Done).
- **⏳ Pending & Scheduled Tracking**: Dedicated modules for managing outstanding balances and future rental bookings.
- **🎯 Custom Control Mode**: A sidebar-driven toggle that enables advanced administrative actions and status overrides.
- **💎 Premium Aesthetics**: 
  - Glassmorphism design elements.
  - Custom **Host Grotesk** typography.
  - Branded color palette (Emiru Red & Yellow).
  - Smooth micro-animations and responsive layouts.

---

## 🛠️ Tech Stack

### Frontend Core
- **React 18**: Component-based UI architecture.
- **TypeScript**: Strict type safety for robust development.
- **Vite**: Ultra-fast build tool and dev server.
- **React Router 6**: Client-side routing for seamless navigation.

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Shadcn/UI**: High-quality, accessible components built on Radix UI.
- **Lucide Icons**: Beautiful, consistent icon set.
- **Recharts**: Data visualization for reporting and analytics.

### State & Utilities
- **TanStack Query**: Efficient server-state management.
- **React Hook Form + Zod**: Schema-driven form validation.
- **Sonner**: Sleek toast notifications for user feedback.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: 18.x or higher
- **npm**: 9.x or higher

### Installation
1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd emiru-video-rentals
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:5173](http://localhost:5173) in your browser to see the app.

### Build for Production
```bash
npm run build
```
The optimized build will be generated in the `dist/` directory.

---

## 📂 Project Structure

```text
src/
├── components/     # Reusable UI components & Layouts
│   ├── layout/     # AppLayout, Sidebar, Navbar
│   └── ui/         # Base Shadcn UI components
├── pages/          # Full-page route components
├── lib/            # Types, utility functions, and mock data
├── hooks/          # Custom React hooks
└── assets/         # Global styles and branding assets
```

---

## 🎨 Design System

| Element | Specification |
| :--- | :--- |
| **Typography** | Host Grotesk (Heading & Body) |
| **Primary Color** | Emiru Red (#F70A0B) |
| **Secondary Color** | Emiru Yellow (#FFD91A) |
| **Theme** | Dark Sidebar / Light Content (Glassmorphism) |

---

## 🛡️ License

This project is for internal/private use. 

---
Developed with ❤️ by the Emiru Team.
