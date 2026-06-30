# Product Buzz ⚡

A high-performance, responsive daily companion web application designed for Product Managers (aspiring, transitioning, and early-career PMs). Built using **Next.js 16 (App Router)**, **Supabase**, and **Google Gemini AI**.

Designed with a **"Content First, Interface Second"** aesthetic. The interface is optimized to encourage and cultivate a daily micro-learning habit.

---

## 🚀 Core Features

1. **📰 The Hub (Global PM News)**:
   - Aggregated news from top publications (Lenny's Newsletter, Mind the Product, TechCrunch, HBR, etc.) using parsed RSS feeds.
   - Client-side category filters and bookmarking capabilities.
   - 2-column grid layout on desktop, collapsing to single cards on mobile.

2. **🃏 PM Drill (The Daily Hook)**:
   - A swipeable, double-sided 3D card deck containing 30+ curated scenario questions.
   - Card types: Guesstimates, Root Cause Analysis (RCA), Metrics Formulas, Frameworks, and Case Studies.
   - Left-swipe/Review later puts the card back in rotation. Right-swipe/Got it masters it.
   - Integrated learning streak counters with visual fire 🔥 animations.

3. **📚 Product Dictionary**:
   - Split-pane interface showcasing 200+ detailed product breakdowns (Global and Indian top lists).
   - Profiles list problem mapping, key features, revenue models, growth statistics, and actionable **PM Lessons**.
   - Request-a-Product submission portal.

4. **🤖 Buzz AI PM Coach**:
   - Floating chat drawer accessible on all pages, plus a dedicated full-screen agent workspace.
   - Streams conversational learning responses powered by **Gemini 1.5 Flash** with custom PM coaching system directives.

---

## 🛠️ Tech Stack & Design System

- **Framework**: Next.js 16 (App Router)
- **Styling**: Vanilla CSS (CSS variables, responsive layouts, 3D flip keyframes)
- **Database & Auth**: Supabase SSR
- **AI Integration**: Google Generative AI (`@google/generative-ai`)
- **RSS Parser**: `rss-parser`

---

## ⚙️ Vercel Deployment & Setup

This repository is **Vercel deploy ready**. Next.js App Router patterns, edge cache headers, and named proxy middleware exports compile static/dynamic paths error-free out-of-the-box.

### 1. Push to GitHub
Initialize your remote and push this repository:
```bash
git remote add origin https://github.com/YOUR_USERNAME/product-buzz.git
git branch -M main
git push -u origin main
```

### 2. Import to Vercel
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New** → **Project**.
3. Import your `Product Buzz` repository.

### 3. Configure Environment Variables
Add the following key-value pairs in the Vercel Project Settings:

| Environment Variable | Description |
|----------------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project API URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase Project Anonymous Key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role Key (for dictionary requests) |
| `GEMINI_API_KEY` | Your Google Gemini API Key |

---

## 💻 Running Locally

### 1. Clone & Install
```bash
npm install
```

### 2. Developer Mock-Auth Mode
If your Supabase env variables are unconfigured or set to placeholders, the login/signup and proxy routers fall back to a mock user cookie (`product_buzz_mock_user`). **You can type any email/password during login to explore the app.**

To run the local server:
```bash
npm run dev
```
Open `http://localhost:3000` to start previewing!
