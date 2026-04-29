# Penguin - A Ecommerce Website

A full-stack MERN e-commerce platform featuring Redux state management, Firebase auth, and a robust admin dashboard.

## Live Demo

- Live URL: [https://penguin-shopping.web.app/home/](https://penguin-shopping.web.app/home/)

## Repository

- GitHub Client: [https://github.com/mahmoodfoysal/penguin-frontend](https://github.com/mahmoodfoysal/penguin-frontend)
-
- GitHub Backend: [https://github.com/mahmoodfoysal/penguin-backend](https://github.com/mahmoodfoysal/penguin-backend)

## Technologies Used

- React.js
- Redux
- Firebase
- Node.js
- Express.js
- MongoDB
- Tailwind CSS
- Daisy UI

## Key Features

- Advanced filtering (Category, Price, Brand) and sorting
- Secure Admin & Super Admin dashboard for total site control
- Dynamic product details with reviews and ratings

## Setup and Installation

### 1) Clone the repository

```terminal
git clone https://github.com/mahmoodfoysal/penguin-frontend
cd penguin-frontend
```

### 2) Install dependencies

```terminal
npm install
```

### 3) Configure environment variables

Create a `.env.local` file in the root directory and add:

```env

VITE_APP_API_KEY=your_key
VITE_APP_AUTH_DOMAIN=your_domain
VITE_APP_PROJECT_ID=your_project_id
VITE_APP_STORAGE_BUCKET=your_storage_bucket
VITE_APP_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_APP_ID=your_app_id

```

Do not commit `.env.local` to version control.

### 4) Run the development server

```terminal
npm run dev
```

Open [http://localhost:5600](http://localhost:5600).

### 5) Build for production

```terminal
npm run build
```
