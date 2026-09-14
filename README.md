<div align="center">

  <br />
  
  <h1>✦ DAEROBI — PORTFOLIO ✦</h1>
  
  <p>
    <strong>Minimalist, High-Performance Personal Portfolio & Showcase</strong>
  </p>

  <p>
    <a href="https://github.com/daerobi-devs/Portofolio-daerobi">
      <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    </a>
    <a href="https://github.com/daerobi-devs/Portofolio-daerobi">
      <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
    </a>
    <a href="https://github.com/daerobi-devs/Portofolio-daerobi">
      <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    </a>
    <a href="https://github.com/daerobi-devs/Portofolio-daerobi">
      <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
    </a>
    <a href="https://github.com/daerobi-devs/Portofolio-daerobi">
      <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker Ready" />
    </a>
  </p>

  <br />

</div>

---

## 🌟 Overview

Sebuah portofolio web modern dengan filosofi desain **Ultra-Clean Minimalism**, mengedepankan tipografi presisi, interaktivitas fisik (*real-time physics-driven UI*), dan performa kilat. Dibuat dengan stack Next.js 15 App Router dan dioptimalkan untuk self-hosted deployment di **Coolify**.

---

## ✨ Key Features & Highlights

- 🎭 **Curtain Sweep Intro**: Animasi cinematic dark screen dengan inisial badge `DR` yang menyapu ke atas saat pertama kali website dibuka.
- ⚡ **Interactive Split Hero**: Portrait split dengan spring physics dan inverted micro-parallax responsif mengikuti kursor mouse.
- 🚆 **Scroll-Driven Convoy Journey**: Rangkaian badge lanyard gantung yang bergerak otomatis seperti gerbong monorail saat di-scroll (maju & mundur real-time) serta tali elastis yang dapat ditarik dengan fisika karet (*rubber stretch*).
- 💼 **Interactive Project Showcase**: Galeri project terpilih dengan detail modal viewer, stack badges, dan direct action links.
- 🛠 **Organized Skills Grid**: Matriks kemampuan teknis yang terbagi ke dalam Frontend, Backend, dan Cloud / Homelab Architecture.
- ✉️ **Direct Email & Contact**: Form kontak terintegrasi dan direct quick-connect ke WhatsApp, GitHub, dan Instagram.
- 🐳 **Self-Host & Docker Ready**: Dilengkapi `Dockerfile` multi-stage (Node 20 Alpine Standalone) yang siap di-deploy langsung ke **Coolify** / server pribadi.

---

## 🛠 Tech Stack

| Domain | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router, Standalone Output) |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) & PostCSS |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) (Springs, MotionValues, Transforms) |
| **Media & Motion** | [Remotion](https://www.remotion.dev/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Deployment** | Docker Multi-Stage / Coolify |

---

## 📁 Project Structure

```bash
├── data/
│   └── projects.json          # Data manifest project & showcase
├── public/                    # Asset gambar, ikon, & logo
├── src/
│   ├── app/
│   │   ├── globals.css        # Global CSS & Tailwind layers
│   │   ├── layout.tsx         # Root layout & font configurations
│   │   └── page.tsx           # Main single-page application entry
│   └── components/
│       ├── PageLoader.tsx     # Curtain sweep intro loader
│       ├── Navbar.tsx         # Floating minimal dark navbar
│       ├── Hero.tsx           # Split portrait with spring physics
│       ├── About.tsx          # Personal story & introduction
│       ├── Journey.tsx        # Scroll-driven lanyard badges convoy
│       ├── Projects.tsx       # Project gallery & interactive modal
│       ├── Skills.tsx         # Categorized tech stack grid
│       ├── Footer.tsx         # Contact form, social links & footer nav
│       └── Icons.tsx          # Custom SVG icons
├── Dockerfile                 # Multi-stage production build
├── .dockerignore              # Docker build exclusions
├── next.config.mjs            # Standalone output configuration
└── package.json               # Dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `>= 20.x`
- npm / yarn / pnpm

### 1. Clone the repository
```bash
git clone https://github.com/daerobi-devs/Portofolio-daerobi.git
cd Portofolio-daerobi
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browsermu.

### 4. Build for production
```bash
npm run build
npm start
```

---

## 🐳 Deploy with Docker / Coolify

Build dan jalankan langsung menggunakan Docker:

```bash
# Build image
docker build -t daerobi-portfolio .

# Run container
docker run -d -p 3000:3000 --name daerobi-portfolio daerobi-portfolio
```

---

## 📬 Contact & Connect

- **Email**: [daerobii0223@gmail.com](mailto:daerobii0223@gmail.com)
- **WhatsApp**: [+62 851-2360-7711](https://wa.me/6285123607711)
- **GitHub**: [@daerobi-devs](https://github.com/daerobi-devs)
- **Instagram**: [@dae.obiy](https://www.instagram.com/dae.obiy)

---

<div align="center">
  <sub>Crafted with passion, precision, and clean minimalism by <strong>Daerobi</strong> © 2026.</sub>
</div>
