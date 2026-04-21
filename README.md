# NutriTrack AI

A smart nutrition tracking web app that helps users log meals, analyze dietary habits, and gain meaningful insights into their daily and weekly nutrition patterns.

---

## Overview

NutriTrack AI is designed to go beyond basic calorie tracking. It combines **data logging + analytics + insights** to help users understand what they eat and how it impacts their health.

---

## Problem Statement

Many users struggle to:

* Track daily nutrition consistently
* Understand if they are meeting protein/calorie goals
* Identify unhealthy patterns in their diet

**NutriTrack AI solves this by:**

* Making food logging simple
* Providing daily + weekly insights
* Highlighting deficiencies and trends

---

## Target Users

* Students managing diet alongside busy schedules
* Fitness beginners tracking protein intake
* Health-conscious individuals improving eating habits

---

## Features

### Authentication

* Email/Password login
* Google Sign-In
* Persistent user sessions

---

### Food Logging

* Add meals with:

  * Calories
  * Protein
  * Carbs
  * Fat
* Edit/Delete entries
* View logs by date

---

### Daily History

* Navigate between days
* View all meals for selected date
* See total nutrition summary

---

### Weekly Insights

* 7-day nutrition overview
* Graph-based visualization
* Average calorie & macro intake

---

### Smart Insights

* Detects:

  * Low protein intake
  * Under-eating / over-eating
* Provides actionable feedback

---

## Tech Stack

### Frontend

* React (Functional Components + Hooks)
* Context API (Global State Management)
* React Router (Navigation)
* Tailwind CSS / Custom CSS

### Backend (BaaS)

* Firebase Authentication
* Firestore Database

---

## Project Structure

```
src/
│
├── components/        # Reusable UI components
├── pages/             # Main pages (History, Insights, etc.)
├── context/           # Global state (Auth, Food Logs, Profile)
├── services/          # Firebase logic
├── utils/             # Helpers (date, calculations)
├── hooks/             # Custom hooks
```

---

## Core Workflow

1. User logs in
2. Adds food entries
3. Data stored in Firestore
4. App processes:

   * Daily totals
   * Weekly trends
5. Insights are generated and displayed

---

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/nutri-track-ai.git

# Navigate into project
cd nutri-track-ai

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## Environment Variables

Create a `.env` file:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## Example Use Case

* User logs:

  * Breakfast: Poha
  * Lunch: Dal + Rice
  * Dinner: Roti + Sabzi

The app calculates:

* Total calories
* Protein intake

Insights:

* Protein intake is below target for multiple days

---

## Current Limitations

* Food logging is optimized for real-time (same-day entry)
* Manual nutrition entry (no API integration yet)

---

## Future Improvements

* Food search (nutrition API integration)
* Mobile responsiveness improvements
* AI-based meal suggestions
* Advanced analytics (trend prediction)

---

## Demo

https://drive.google.com/file/d/1izjgpVSPzp42ts1ufyYocs76PVSi1CfH/view?usp=sharing

---

## Live Deployment

https://69e79e7e3a226626061a0c1e--nutrition-track-ai.netlify.app

---

## Author

Riddhima Jaiswal

---

## Final Note

This project demonstrates not just React skills, but the ability to design a meaningful, data-driven application.

---

## If you like this project

Consider giving it a star on GitHub.

