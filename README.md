# QuizMind — AI-Powered Quiz Application

Welcome to **QuizMind**, an intelligent quiz platform built with modern web technologies.  
It provides an interactive quiz experience with real-time scoring, a clean UI, and smooth performance.

**Live Demo:** https://quiz-mind-eight.vercel.app/  
**Walkthrough Video:** *(Loom link)*

---

## Project Structure

Below is the project’s folder hierarchy:

QuizMind/
├── public/
│ ├── icons/
│ ├── images/
│ └── favicon.ico
|
├── src/
│ ├── assets/
│ │ ├── icons/
│ │ └── images/
│ │
│ ├── components/
│ │ ├── ui/
│ │ │ ├── Button.tsx
│ │ │ ├── Card.tsx
│ │ │ └── Loader.tsx
│ │ │
│ │ ├── quiz/
│ │ │ ├── QuizCard.tsx
│ │ │ ├── QuizTimer.tsx
│ │ │ └── QuestionDisplay.tsx
│ │ │
│ │ ├── layout/
│ │ ├── Navbar.tsx
│ │ └── Footer.tsx
|
│ ├── pages/
│ │ ├── Home.tsx
│ │ ├── Quiz.tsx
│ │ └── Result.tsx
|
│ ├── hooks/
│ │ └── useQuiz.ts
|
│ ├── lib/
│ │ ├── utils.ts
│ │ └── constants.ts
|
│ ├── styles/
│ │ └── globals.css
|
│ ├── App.tsx
│ ├── main.tsx
│ └── vite-env.d.ts
|
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md

yaml
Copy code

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
