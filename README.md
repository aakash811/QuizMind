# QuizMind — AI-Powered Quiz Application

Welcome to **QuizMind**, an intelligent quiz platform built with modern web technologies.  
It provides an interactive quiz experience with real-time scoring, a clean UI, and smooth performance.

**Live Demo:** https://quiz-mind-eight.vercel.app/  
**Walkthrough Video:** *(Loom link)*

---

## Project Structure

Below is the project’s folder hierarchy:

📦 QuizMind-main
├─ public/
│  ├─ placeholder.svg
│  └─ robots.txt
│
├─ src/
│  ├─ components/
│  │  ├─ ErrorScreen.tsx
│  │  ├─ LoadingSpinner.tsx
│  │  ├─ NavLink.tsx
│  │  ├─ QuestionCard.tsx
│  │  ├─ ThemeToggle.tsx
│  │  └─ TopicCard.tsx
│  │
│  ├─ context/QuizContext.tsx
│  ├─ hooks/
│  │  ├─ use-mobile.tsx
│  │  └─ use-toast.ts
│  │
│  ├─ integrations/supabase/
│  │  ├─ client.ts
│  │  └─ types.ts
│  │
│  ├─ lib/utils.ts
│  ├─ pages/
│  │  ├─ Index.tsx
│  │  └─ NotFound.tsx
│  │
│  ├─ screens/
│  │  ├─ QuestionGeneratorScreen.tsx
│  │  ├─ QuizScreen.tsx
│  │  ├─ ResultScreen.tsx
│  │  └─ TopicSelectionScreen.tsx
│  │
│  ├─ utils/aiClient.ts
│  ├─ App.tsx
│  ├─ main.tsx
│  ├─ index.css
│  └─ vite-env.d.ts
│
├─ supabase/
│  ├─ functions/
│  │  ├─ generate-feedback/index.ts
│  │  └─ generate-questions/index.ts
│  └─ config.toml
│
├─ .gitignore
├─ components.json
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ README.md
├─ tailwind.config.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts


---

## Features

- Smart quiz logic with smooth question navigation  
- Built-in timer to manage quiz duration  
- Result summary with detailed score feedback  
- Modern UI built with Tailwind CSS  
- High performance powered by Vite + React  
- Reusable, modular component architecture  

---

## Tech Stack

- **Frontend:** React + TypeScript  
- **Styling:** Tailwind CSS  
- **Build Tool:** Vite  
- **Deployment:** Vercel  

---

## How to Run Locally

## How to Run Locally

### 1. Clone the Repository
```sh
git clone https://github.com/aakash811/QuizMind.git
cd QuizMind
```

### 2. Install Dependencies
```sh 
npm install
```

### 3. Start the Development Server
```sh 
npm run dev
```

### Contributing
Contributions, issues, and feature requests are welcome.
Feel free to open a PR or raise an issue.

### License
This project is licensed under the MIT License.
