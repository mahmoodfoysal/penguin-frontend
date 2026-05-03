# Penguin - A Ecommerce Website

A full-stack MERN e-commerce platform featuring Redux state management, Firebase auth, and a robust admin dashboard.

## Live Demo

- Live URL: [https://penguin-ecom.vercel.app](https://penguin-ecom.vercel.app)

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
- ApexCharts
- Material Icons

## Key Features

- Advanced filtering (Category, Price, Brand) and sorting
- Secure Admin & Super Admin dashboard for total site control
- Dynamic product details with reviews and ratings
- Customer Profile Section
- Product Review Section
- Order Management Section
- Order tracking system
- Cupon code system
- Blog Section
- Dashboard Overview

## Protected Routes

- Login and Registration
- Dashboard
- Checkout
- Profile
- Order History

## Public routes

- Home
- Product Details
- Product
- Blogs
- About
- Contact
- Cart

## Short Description

- Navbar: switching routing and user information
- Landing Page: A attractive standard landing page for the e-commerce website. Where customer can see best seller, New arrivals, Featured products, Categories Card, Blogs, Offers, Coupon codes, services
- Products Page: This page show all products. Here category, brand, price and search filter.
- Product Details Page: This page show specific product details. Related products also show in the bottom.
- Customer Authentication: Secure login and registration using Firebase authentication.
- Order Management: Track and manage orders with detailed status updates.
- Customer Profile: View and edit profile information with order history.
- Blog System: Read and interact with blog posts.
- Blog Details Page: This page show specific blog details. In the bottom show related blog
- Dashboard Overview: Get insights into sales, orders, add products, add categories add coupon, add admin, add blog.
- Pagination: It add where many data comes.
- Products, category, blogs all have a status. If status 1 then only product show. If 0 then product is inactive.
- Footer have full functional. Footer email address use for promotional massage.

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
