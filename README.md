# Fullstack Vite Web Application

## Backend

- MongoDB
- Express
- NodeJS
- bcryptjs
- request-ip
- useragent
- axios
- Stripe
- uuid

## Frontend

- Vite
- Firebase
- React Router
- Axios
- React-Three/fiber
- React-Three/drei
- React-Confetti
- React-Icons
- React-Stripe and Stripe

## Project Overview

This project is a full-stack web application built using **Vite**, **React**, and **Firebase** on the frontend, while leveraging **Node.js**, **Express**, and **MongoDB** for the backend. The primary objective of this project is to implement a user registration and authentication system with data collection features, enabling a comprehensive user experience that includes account creation, login, blog feature, profile management, 3 mini games (Blackjack, Matching, and Simon Says), and a shopping cart with **Stripe** payment processing. Payment details are never stored in the backend, but transaction logs (cart items, payment status, user details) are securely stored in MongoDB.

The backend securely handles user data such as personal information, device and browser details, IP address, and more. This data is stored in MongoDB, with strict age verification in compliance with legal guidelines.

## Blog Feature

This web application also includes a **Blog Feature** where users can:

- **Create Blog Posts**: Users can write and publish their own blog posts.
- **Edit Blog Posts**: Users have the ability to edit their previously created blog posts.
- **Delete Blog Posts**: Users can delete blog posts they have created.

All user interactions with the blog posts are tracked in the backend, and the data is stored securely in the MongoDB database. This includes:

- The **creation time and date** of the blog post.
- The **author’s details** (linked to their user account).
- Any **updates made** to the blog posts.

## Games Feature

This web application includes interactive mini-games to enhance user engagement:

### Blackjack

- **Play Blackjack**: Users can play a classic game of Blackjack against a dealer.
- **Score Tracking**: User scores, wins, losses, and other statistics are tracked and stored in the backend.
- **Personal Stats**: Users can view their Blackjack game statistics, including highest scores, games played, and win/loss record.

### Memory Matching Game

- **Play Memory Game**: Users can test their memory by matching pairs of cards.
- **Performance Tracking**: The number of turns taken and other statistics are recorded and stored in the backend.
- **Personal Stats**: Users can view their personal best scores and game history.

All user interactions with the games are tracked in the backend, and the data is stored securely in the MongoDB database. This includes:

- **Game scores and statistics**.
- **Date and time** of each game played.
- **User performance data** linked to their account.

## Simon Says Game

- **Play Simon Says**: Users can test their memory and reaction skills by following an increasingly complex sequence of colors.
- **Progress Tracking:** The highest level reached and other statistics are recorded and stored in the backend.
- **Personal Stats**: Users can view their Simon Says game statistics, including highest level achieved, games played, and game history.

All user interactions with the Simon Says game are tracked in the backend, and the data is stored securely in the MongoDB database. This includes:

- **Game levels and statistics.**
- **Date and time of each game played.**
- **User performance data linked to their account.**

## News API Feature

### Integration with NewsData.io API

Integrated the **NewsData.io API** to fetch the latest news articles and display them on the user's personal feed.

#### Features:

- **Trending Topics**: Displays the latest trending news articles.
- **Real-Time Updates**: News feed is updated regularly to provide current information.
- **Secure API Calls**: API key is securely stored on the backend using environment variables.
- **Attribution**: Proper attribution is given to NewsData.io as per their terms.

#### How It Works:

1. **Backend API Call**: The backend server makes a request to NewsData.io API using the stored API key.
2. **Endpoint**: A custom endpoint `/api/news` is created to serve news data to the frontend.
3. **Frontend Fetch**: The frontend fetches news data from the backend endpoint.
4. **Display**: News articles are displayed in a user-friendly format with images, titles, descriptions, and publication details.

#### Why NewsData.io?

- **Free Tier**: Offers a generous free tier suitable for small to medium traffic.
- **Legal Compliance**: Allows use in production with proper attribution.
- **Ease of Use**: Provides a simple and straightforward API.

#### Attribution:

As per **NewsData.io's** terms of service, proper attribution is required.

> News data provided by [NewsData.io](https://newsdata.io)

## Shopping, Cart, and Checkout with Stripe Integration Feature

This web application includes a **shopping cart** feature that allows users to add items to their cart and proceed to a checkout page to complete their purchase using **Stripe** as the payment gateway. User interactions are tracked in MongoDB, and successful transactions are logged with the corresponding user data.

### Key Features:

- **Add to Cart**: Users can add items to their cart from the shopping page.
- **View Cart**: Users can view their selected items, adjust quantities, and remove items.
- **Checkout**: Users can securely process payments using Stripe, with real-time integration and error handling.
- **Data Tracking**: All user transactions, including cart items, total amount, and payment status, are recorded in MongoDB.

### Stripe API Integration

Stripe is used to handle payments securely. You will need to create a Stripe account and use your **Publishable Key** and **Secret Key** to enable this functionality.

### Setting Up Stripe

1. **Get Your API Keys**:

   - Visit the [Stripe Dashboard](https://dashboard.stripe.com/apikeys) and retrieve your **Publishable Key** and **Secret Key**.

2. **Environment Variables**:  
   Add the following environment variables to the `.env` file in your backend:

   ```bash
   STRIPE_SECRET_KEY=your-secret-key
   ```

   ### Frontend Integration

In your frontend (e.g., `Checkout.jsx`), you will need to replace the test **Publishable Key** with your own from the Stripe Dashboard:

```
const stripePromise = loadStripe('your-publishable-key');
```

### Stripe Test Cards

You can simulate payments during development by using Stripe’s test card numbers. Here are some commonly used test cards:

#### Successful Payment:

- **Card Number**: `4242 4242 4242 4242`
- **Expiry**: Any future date (e.g., `12/34`)
- **CVC**: Any 3 digits (e.g., `123`)
- **ZIP**: Any 5 digits (e.g., `12345`)

#### Payment Declined:

- **Card Number**: `4000 0000 0000 0002`

#### Example Shipping Address (optional for testing):

- **Address Line 1**: `123 Test St`
- **City**: `Testville`
- **State**: `CA`
- **Postal Code**: `94111`
- **Country**: `US`

By using these test cards, you can simulate both successful and failed payments in the Stripe environment, allowing you to thoroughly test the payment flow in your application.

### Dev Testing Method

You can use Stripe’s test card numbers to simulate different payment scenarios:

- For a **successful payment**, use the test card `4242 4242 4242 4242`.
- For a **declined payment**, use the test card `4000 0000 0000 0002`.

Make sure to enter the correct details as required (e.g., expiration date, CVC, ZIP code) when testing the payment.

## Scope of the Project

This web application focuses on:

1. **User Registration**: The user can sign up with their personal details such as name, email, phone, and date of birth. The system includes age verification to ensure users under 13 cannot register.
2. **User Authentication**: Firebase authentication is used for both email/password and Google sign-in options.
3. **Data Collection**: When a user signs up, the backend collects and stores user information, including:
   - Basic personal information (name, email, phone, etc.).
   - Date of birth to enforce the age restriction (13+).
   - IP address, device type, browser, and operating system.
   - User acceptance of the Privacy Policy.
4. **Profile Management**: Users can manage their profile details, such as updating their information or viewing their past login history.
5. **Privacy Policy Compliance**: Users must agree to the privacy policy before completing the registration process. This policy explains the types of data being collected, including personal data, device information, and analytics data (Google Analytics and Google AdSense).
6. **Interactive Games**: The application includes mini-games (Blackjack and Memory Matching Game) that allow users to engage and have fun while their game statistics and performance data are tracked and stored.
7. **Search Feature**: Users can search for blog posts using keywords, and the blog results dynamically update based on the query. This makes it easier for users to find relevant posts.
8. **Create and Edit Blog Posts**: Users can create, edit, and delete blog posts. The blog feature is integrated into the platform, allowing users to share content with others.
9. **Comments**: Users can comment on blog posts, and all comments are stored in MongoDB. Comments can also be deleted by the post author.
10. **Shopping Cart and Checkout System**: Users can browse a list of items and add them to their cart. The cart is viewable, where users can adjust item quantities or remove items. Each user’s shopping history, including cart items and transaction logs, is securely stored in the backend.
11. **Checkout**: Users can proceed to checkout where they can securely process payments using Stripe. Payments are handled via Stripe’s API, and all transaction data, such as total amounts and payment statuses, are logged in MongoDB.

## Packages and Technologies Used

### Frontend

- **Vite**: Vite is a modern build tool that provides fast development and improved performance compared to traditional bundlers like Webpack.
- **Three.js**: A JavaScript library for creating 3D graphics and animations in the browser.
- **React**: A front-end JavaScript library for building interactive user interfaces.
- **Firebase**: Firebase Authentication is used to handle user authentication via email/password and Google sign-in. It simplifies the management of user accounts.
- **React Router**: For seamless navigation and routing between the various pages (e.g., home, profile, login, signup, etc.).
- **Axios**: Axios is a promise-based HTTP client used to make API calls to the backend for data retrieval and submission.
- **dotenv**: Loading environment variables for secure configurations.
- **React-Confetti**: Used to display celebratory confetti effects in games upon certain achievements or wins.
- **CSS and Animations**: Custom CSS and animations are used to enhance the visual experience of the games.
- **@stripe/react-stripe-js**: The official React library for integrating Stripe’s payment system. It provides components to manage Stripe Elements and handle the payment process.
- **@stripe/stripe-js**: A library that loads the Stripe.js script to handle payment processing, allowing secure and seamless integration with the Stripe API.

### Backend

- **Node.js**: JavaScript runtime used to run the backend server.
- **Express**: A web framework for Node.js that is used to handle routing, middleware, and API endpoint creation.
- **MongoDB**: A NoSQL database used to store user data such as personal information, IP addresses, device information, and more.
- **bcryptjs**: A library used to securely hash passwords before storing them in the database.
- **request-ip**: A package that helps capture the user's IP address when they make requests to the server.
- **useragent**: This package is used to capture detailed information about the user's device and browser, such as browser type, operating system, and device category.
- **Axios**: Making API calls to external services like NewsData.io.
- **dotenv**: Loading environment variables for secure configurations.
- **uuid**: A library used to generate unique identifiers (UUIDs) for cart items and other objects in the application.
- **stripe**: A package that provides integration with Stripe’s API for securely processing payments, creating payment intents, and managing transactions.

## Features

### Frontend Features

- **Sign-Up & Login**: Users can register for an account using either their email/password or via Google authentication.
- **Form Validation**: The sign-up form validates user input such as email format, password complexity, and ensures users are at least 13 years old before allowing them to create an account.
- **Privacy Policy Confirmation**: Users must confirm that they have read and agreed to the privacy policy before completing registration.
- **Google Sign-In Integration**: Users can use Google credentials for seamless sign-up and login via Firebase.
- **Shopping Cart**:
  - Users can add items to their shopping cart, view selected items, adjust quantities, and remove items.
  - The shopping cart displays the total price of items, and users can proceed to checkout to complete their purchase using Stripe.
- **Checkout with Stripe Integration**:
  - Users can securely complete transactions via Stripe, entering their payment details and confirming their order.
  - The frontend integrates real-time error handling for payment processing and confirmation of successful transactions.
- **Blog**:
  - Users can create new blog posts, edit, and delete their own posts.
  - Users can also comment on blog posts, adding discussions and feedback.
  - A search feature allows users to search for specific blog posts by keywords.

### Backend Features

- **User Data Collection**: The backend captures and stores user data such as IP address, device type, operating system, and browser information. This is useful for security measures, analytics, and personalization.
- **Age Verification**: The backend checks the user's date of birth to enforce that users under 13 are denied from registering, ensuring compliance with legal guidelines (e.g., COPPA).
- **Password Hashing**: User passwords are securely hashed using **bcryptjs** before being saved in the database.
- **Device Logging**: The backend logs device and browser information during registration and login to maintain a secure environment and monitor user activities.
- **MongoDB Storage**: All user data is stored in MongoDB, ensuring scalability and flexibility for large datasets.
- **Game Data Collection**: The backend records and stores user game statistics such as scores, wins, losses, game durations, and other relevant data.
- **User Game History**: Users can view their game history and performance statistics.
- **Shopping Cart**:
  - The backend tracks the user's cart, storing the items they have added, and updating the cart when items are removed or quantities are changed.
  - The backend also processes Stripe payment intents and records successful transactions, including payment status, cart contents, and user details.
- **Order History**: After checkout, the user's order history is saved, including the items purchased, total price, and payment status.
- **Blog**:
  - The backend handles all CRUD operations (Create, Read, Update, Delete) for blog posts.
  - It stores all posts and comments, linking them to the appropriate user accounts.
  - Each post includes metadata such as the creation date, author, and update history.

## Privacy Policy and Data Collection

This application complies with privacy regulations by ensuring users must agree to the privacy policy before completing the registration process. The privacy policy explicitly states that the following data is collected:

- **Personal Information**: Name, email, phone number, date of birth, etc.
- **IP Address**: Collected via `request-ip` to monitor user sessions and track locations for security purposes.
- **Device and Browser Information**: Collected via `useragent` to track user devices, operating systems, and browsers used to access the platform.
- **Google Analytics**: (To be added) Traffic and usage data will be collected through Google Analytics to improve the user experience.
- **Google AdSense**: (To be added) Advertisements served via Google AdSense will track user interactions to display relevant ads.

## How to Run the Project

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v16+)
- **MongoDB** (either locally or use a cloud service like MongoDB Atlas)
- **Firebase** account for authentication
- **NewsData.io** API key
- **Stripe** Public API Key and Private API Key

### Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repository/fullstack-vite-app.git
   cd fullstack-vite-app
   ```

## Installation Guide

### Install Dependencies:

#### For the backend:

```bash
cd backend
npm install
node index.js
```

#### For the backend:

```bash
cd frontend
npm install
npm run dev
```

## TODO - Future Enhancements:

These features will be added in future releases. Suggestions are welcomed.

- **Personalized User Feed**: Integrate free APIs to create a tailored content feed for each user.
- **Chat Feature**: Implement direct messaging functionality to allow users to communicate in real-time.
- **AI Image Generator**: Integrate an AI-powered image generator for user interactions or creative features.
- **AI Bot**: Add an AI bot to assist users or provide dynamic interactions.
- **Lore History Section**: Develop a detailed lore/history section with categorized sublinks for easy navigation.
- **Help/Contact Section**: Create a help and contact page to provide user support and FAQs.

## License Info

## License Info

This work is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/).

**Attribution**: You must give appropriate credit to me, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

**NonCommercial**: You may not use the material for commercial purposes.

**ShareAlike**: If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.

### Full Legal Code

For more details, refer to the full legal code of the license [here](https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode).

_Copyright (c) 2024 Jessica Cousins_

## Contributing

I welcome contributions to this project! If you find any issues, have ideas for improvements, or want to contribute new features.
