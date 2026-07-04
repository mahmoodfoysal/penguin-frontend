# Penguin - E-commerce Website

Penguin Gear Ltd. is a high-performance e-commerce platform engineered to deliver authentic products at competitive price points. The core architecture focuses on removing common user complexities through smooth, automated workflows and absolute transactional transparency. From user-centric navigation and dynamic filtering to secure payment integration and real-time order tracking, every element is crafted to ensure reliability, scalability, and a seamless buying experience.

## Live Demo

- Live URL: [https://penguin-gear.netlify.app](https://penguin-gear.netlify.app)

## Repository

- GitHub Client: [https://github.com/mahmoodfoysal/penguin-frontend](https://github.com/mahmoodfoysal/penguin-frontend)
-
- GitHub Backend: [https://github.com/mahmoodfoysal/penguin-backend](https://github.com/mahmoodfoysal/penguin-backend)

## Technologies Used

- React.js
- Redux Toolkit
- Firebase
- Node.js
- Express.js
- MongoDB
- Tailwind CSS
- Daisy UI
- ApexCharts
- Material Icons
- React Rating
- Google Fonts

## Key Features

- Architected a strict, token-verified user matrix that dynamically mutates the sidebar navigation layout, serving restricted administration modules to authorized personnel while maintaining a clean client-facing environment.

- Implemented a highly consistent, atomic inventory deduction algorithm that updates and scales stock volumes automatically per order submission to eliminate over-purchasing bottlenecks.

- Engineered a high-performance discovery pipeline featuring automated New Arrivals and Bestseller flags, coupled with advanced client-side filters (Category, Brand, Price Range) and multi-directional sorting mechanics.

- Built a smart promotional system that automatically distributes welcome incentives to newly registered accounts and validates custom coupon codes securely at the checkout boundary.

- Developed an active transactional tracking lifecycle allowing customers to monitor live order status directly from their panel, backed by a secure 10-day token-expiration security layer that automatically invalidates and flushes dormant user sessions.

- Engineered a time-sensitive server-side guardrail that empowers users with an autonomous, 2-hour post-purchase grace period to safely cancel their delivery before fulfillment processes lock.

- Designed a feature-rich client command center combining persistent product wishlists, active coupon ledgers, real-time profile updates, and encrypted password-rotation mechanisms.

- Created immersive product layout sheets displaying live descriptions, category associations, dynamic star ratings, and community reviews.

- Built a scalable, markdown-compatible blogging ecosystem complete with dedicated content-detail views to drive platform SEO and organic user engagement.

- Implemented strict server-side and client-side route guarding that dynamically shapes the administration dashboard, ensuring operators only see navigation tools and database endpoints matching their exact permission clearance.

## Protected Routes

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
