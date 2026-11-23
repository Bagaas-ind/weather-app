<div align="center">

# 🌤️ Synoptic
### Modern Weather Dashboard

A clean, responsive, and intuitive weather dashboard built with Next.js, React, and TypeScript.

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Lucide React](https://img.shields.io/badge/Lucide_React-F56565?style=for-the-badge&logo=lucide&logoColor=white)](https://lucide.dev/)

[🌐 Live Demo](https://cuaca-synoptic.vercel.app)

</div>

---

## 📖 About

**Synoptic** is a modern weather dashboard designed to provide users with a simple and visually appealing way to explore weather information.

The application features a clean interface, city search functionality, weather summaries, hourly forecasts, and daily weather predictions.

Built with modern frontend technologies, Synoptic focuses on usability, responsive design, and a straightforward user experience.

> **Note:** The current version uses a local demonstration dataset. Weather information is not yet connected to a live weather API.

## ✨ Features

- 🌍 **City Search** — Search and explore weather information for supported cities.
- 📍 **Quick City Selection** — Quickly switch between available locations.
- 🌡️ **Current Weather Overview** — Display temperature and weather conditions.
- 💧 **Weather Details** — View feels-like temperature, humidity, wind speed, and rain probability.
- 🕒 **Hourly Forecast** — Explore hourly weather information.
- 📅 **5-Day Forecast** — View a daily weather overview.
- 🌧️ **Rain Information** — Display rain-related information based on the selected weather dataset.
- 👕 **Daily Recommendations** — Get simple outfit and laundry suggestions.
- 🌙 **Dark Mode** — Switch between light and dark visual themes.
- 🎨 **Dynamic Backgrounds** — Weather dashboard with visually engaging background images.
- 📱 **Responsive Interface** — Designed to provide a comfortable experience across different screen sizes.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | React framework |
| React 19 | User interface library |
| TypeScript | Type-safe JavaScript |
| Tailwind CSS 4 | Styling and responsive design |
| Lucide React | Icon library |
| Vercel | Deployment platform |

## 📸 Preview

Visit the live application to explore the interface:

**https://cuaca-synoptic.vercel.app**

## 🚀 Getting Started

Follow these steps to run Synoptic locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Bagaas-ind/weather-app.git
```

### 2. Navigate to the Project Directory

```bash
cd weather-app
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

### 5. Open in Your Browser

Visit:

```text
http://localhost:3000
```

The application should now be running locally.

## 📂 Project Structure

```text
weather-app/
│
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── public/
│   └── static assets
│
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint checks |

## 🗺️ Current Data Implementation

The current version uses a local dataset to demonstrate the application's weather interface and interactions.

This means:

- Weather information is based on predefined demonstration data.
- City search works with supported local dataset entries.
- Forecast information is intended for interface demonstration.
- The application does not currently retrieve real-time weather information from an external weather service.

## 🔮 Future Improvements

Planned improvements for future development:

- [ ] Integrate a real-time weather API.
- [ ] Implement accurate weather forecasts.
- [ ] Add automatic location detection.
- [ ] Add favorite cities.
- [ ] Improve weather data visualization.
- [ ] Add weather history.
- [ ] Improve accessibility and user experience.
- [ ] Add automated testing.

## 🌐 Deployment

The application is deployed using Vercel.

**Live Application:**  
https://cuaca-synoptic.vercel.app

## 👨‍💻 Developer

**Bagaas-ind**

Information Systems Student | Frontend Developer

GitHub: https://github.com/Bagaas-ind

## 📄 License

No license has been specified for this repository yet.

---

<div align="center">

**Synoptic — Simple Weather Insights, Better Everyday Decisions.**

Made with ❤️ by **Bagaas-ind**

</div>
