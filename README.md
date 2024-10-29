# Fullstack Vite React MongoDB Express Node.js App - MERN Stack

![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)
![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)
![Express](https://img.shields.io/badge/Express-Backend-lightgrey)
![React](https://img.shields.io/badge/React-Frontend-blue)
![Vite](https://img.shields.io/badge/Vite-Build--Tool-orange)
![Stripe](https://img.shields.io/badge/Stripe-Payment-brightblue)
![Firebase Authentication](https://img.shields.io/badge/Firebase-Auth-yellow)
![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)

## Project Description

A full-stack **Vite** application using **React**, **Node.js**, **Express**, **MongoDB**, and **Stripe**. This project integrates **Firebase** for authentication, features engaging mini-games (Blackjack, Memory Matching, and Simon Says), includes a blog platform with CRUD functionality, and a shopping cart with secure **Stripe** payment processing. Additionally, **OpenAI** has been integrated for AI-driven moderation, automatically flagging inappropriate comments, and generating blog content. The Admin Dashboard provides moderators with a comprehensive view of flagged content, alongside sentiment analysis for all interactions.

In addition to the existing features, this project now includes **TensorFlow.js** integration with the **MobileNet Classifier**. This enhancement allows for machine learning capabilities directly on the frontend, specifically for image classification in the shopping cart component. Users can click on merchandise images, and the MobileNet model will identify and classify them into broad categories, delivering real-time feedback on the predicted label.

## Table of Contents

- [Project Description](#project-description)
- [OpenAI Integration](#openai-integration)
- [Machine Learning with TensorFlow.js](#machine-learning)
- [Blog Feature](#blog-feature)
- [Games Feature](#games-feature)
  - [Blackjack](#blackjack)
  - [Memory Matching Game](#memory-matching-game)
  - [Simon Says Game](#simon-says-game)
- [News API Feature](#news-api-feature)
- [Shopping Cart and Stripe Integration](#shopping-cart-and-checkout-with-stripe-integration-feature)
- [Scope of the Project](#scope-of-the-project)
- [Packages and Technologies Used](#packages-and-technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Privacy Policy and Data Collection](#privacy-policy-and-data-collection)
- [How to Run the Project](#how-to-run-the-project)
- [Installation Guide](#installation-guide)
- [Future Enhancements](#future-enhancements)
- [License Info](#license-info)
- [Contributing](#contributing)

## Project Objective

The primary objective of this MERN stack project is to implement a user registration and authentication system with data collection features, enabling a comprehensive user experience that includes account creation, login, blog feature, profile management, 3 mini games (Blackjack, Matching, and Simon Says), and a shopping cart with **Stripe** payment processing. Payment details are never stored in the backend, but transaction logs (cart items, payment status, user details) are securely stored in MongoDB.

The blog platform is enhanced with **AI Sentiment Analysis** and **AI-Generated Content** through **OpenAI**. Users can create, edit, and comment on blog posts, and every comment is processed through OpenAI to categorize it as positive, neutral, or negative. Additionally, **AI moderation** has been integrated to automatically flag inappropriate comments. This flagged data, along with sentiment analysis, is tracked and stored in **MongoDB** and can be accessed through the **Admin Dashboard**, which provides moderators with a comprehensive view of all flagged content and interactions.

The backend securely handles user data such as personal information, device and browser details, IP address, and more. This data is stored in **MongoDB**, with _strict age verification in compliance with legal guidelines_. The **password reset** feature includes backend validation to check if the email exists in the system before triggering a password reset email through Firebase. This helps prevent abuse and exploitation by malicious users.

## OpenAI Integration

This project includes two powerful AI features using OpenAI, and proper attribution to OpenAI is provided in accordance with their usage guidelines.

### AI ChatBot

- **Chat Interaction**: Users can interact with an AI-driven chatbot, asking questions and receiving dynamic responses. This chatbot is powered by OpenAI's GPT model.
- **Real-Time Responses**: The chatbot processes user inputs and generates responses in real-time, enhancing user interaction.
- **User-Friendly Interface**: The chatbot interface is seamlessly integrated into the platform, allowing users to toggle the chatbot on or off and submit messages effortlessly.

### AI Comment Sentiment Analysis

- **Sentiment Analysis on Blog Comments**: Every comment made on a blog post is processed by OpenAI to analyze its sentiment, categorizing it as positive, neutral, or negative.
- **Probabilities**: The sentiment is determined based on probabilities provided by the OpenAI model, with a percentage breakdown for each sentiment type (positive, neutral, negative).
- **Backend Storage**: Sentiment analysis results, including the sentiment type and probability scores, are saved in MongoDB for each comment. This data is displayed on the **Admin Dashboard**, providing a detailed overview of user feedback and engagement on blog posts.

### AI Moderation Integration:

- **AI Moderation for flagging comments**: Integrated AI moderation to automatically flag inappropriate comments based on predefined criteria.
- **AI-generated content**: Enhanced blog functionality with AI-generated content creation using OpenAI.
- **Admin Dashboard Data Access**: Provides moderators with a comprehensive view of flagged content, supported by sentiment analysis for all interactions, ensuring an informed and efficient review process.

### Legal Attribution for OpenAI

This project utilizes OpenAI services for AI-driven chatbot interactions and comment sentiment analysis. OpenAI’s API powers both of these features, and proper credit is given for their services in accordance with OpenAI’s usage guidelines. For more details on OpenAI’s terms, please refer to their [API Terms of Use](https://openai.com/policies/terms-of-use/).

## Machine Learning with TensorFlow.js

### What is Machine Learning?

Machine learning is a field of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. By processing vast amounts of data, machine learning models can recognize patterns and make predictions, which can then be applied to tasks such as image recognition, natural language processing, and more.

### What is TensorFlow?

TensorFlow is an open-source machine learning library developed by Google, enabling developers to build and deploy machine learning models easily. TensorFlow.js allows for running these models directly in the browser, providing a powerful toolset for incorporating AI on the frontend without requiring a backend server to handle predictions.

### TensorFlow.js and MobileNet Integration

Using TensorFlow.js, this project includes the MobileNet model for on-device image recognition. MobileNet is a lightweight, efficient neural network model designed for mobile and embedded applications, optimized to handle real-world images and general object classification. Integrated within the shopping cart, this feature allows users to identify categories of merchandise through direct interaction, enhancing the overall shopping experience with intelligent AI-driven insights.

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

## Simon Says Game

- **Play Simon Says**: Users can test their memory and reaction skills by following an increasingly complex sequence of colors.
- **Progress Tracking:** The highest level reached and other statistics are recorded and stored in the backend.
- **Personal Stats**: Users can view their Simon Says game statistics, including highest level achieved, games played, and game history.

_Note_: All user interactions with the games are tracked in the backend, and the data is stored securely in the MongoDB database. This includes:

- **Game scores and statistics**.
- **Date and time** of each game played.
- **User performance data** linked to their account.

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
12. **Password Reset**: Implemented secure password reset functionality with backend checks to prevent password reset abuse.
13. **OpenAI Chatbot**: Users can engage with a chatbot that provides real-time AI-generated responses powered by OpenAI. The chatbot is seamlessly integrated on the frontend without storing conversation history, maintaining user privacy.
14. **AI Comment Sentiment Analysis**: Each blog comment is automatically analyzed for sentiment (positive, neutral, or negative) using OpenAI's GPT model and is stored in MongoDB for each comment. Sentiment analysis results are displayed on the Admin Dashboard, offering insights for content creators and administrators
15. **AI-Generated Content**: Users can generate content for blog posts through OpenAI’s GPT model. This feature allows for seamless AI-driven content creation, helping users draft blog posts based on input prompts. The generated content is displayed in the blog editor and can be customized further by the user before publishing.
16. **AI moderation**: Integrated AI moderation to automatically flag inappropriate comments, including those containing hate speech, profanity, or other harmful content. Moderators can review flagged content via the Admin Dashboard, where the flagged comments are displayed alongside sentiment analysis to help identify potential violations in real-time.

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
- **openAI ChatBot**: An AI-powered chatbot integrated into the frontend using OpenAI's GPT model.
- **OpenAI Comment Sentiment Analysis**: This feature processes and analyzes the sentiment of blog post comments using OpenAI's GPT model. Each comment is evaluated and categorized as positive, neutral, or negative, with corresponding probabilities.
- **AI-Generated Content**: Users can generate content for blog posts via prompts to OpenAI’s GPT model. The generated content is displayed in the blog editor and can be further customized by the user before publishing.
- **AI Moderation**: Integrated AI-driven moderation automatically flags inappropriate comments for review. Flagged comments are displayed in the Admin Dashboard, with sentiment analysis and reasons for flagging (such as hate speech, profanity, etc.) easily accessible to moderators.

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
- **openAI Chatbot**: There is no data currently stored from the chatbot in the backend.
- **OpenAI Comment Sentiment Analysis**: This sentiment data is stored in MongoDB and displayed on the Admin Dashboard for review by administrators and content creators.
- **AI-Generated Content**: OpenAI’s GPT model is used to generate blog post content based on user prompts. The content is processed and delivered through the backend to the frontend blog editor.
- **AI Moderation**: The backend integrates OpenAI’s moderation API to automatically flag inappropriate content in blog posts and comments. Flagged content, including the reason for flagging, is stored in MongoDB and displayed in the Admin Dashboard for moderator review.

## Features

### Frontend Features

- **Sign-Up & Login**: Users can register for an account using either their email/password or via Google authentication.
- **Password Reset**: checks if the email exists in the database before sending the reset link, ensuring that only valid users can reset their password.
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
  - A **search** feature allows users to search for specific blog posts by keywords.
  - **OpenAI Chatbot**: Users can interact with an AI-driven chatbot integrated into the platform, which provides real-time responses to user queries based on OpenAI's GPT model.
- **Comment Sentiment Analysis**: Every blog comment is automatically analyzed by OpenAI for sentiment (positive, neutral, or negative), with the results displayed in real-time on the Admin Dashboard.
- **AI-Generated Content**: Users can generate blog post content using OpenAI’s GPT model by providing keywords or prompts. The AI-generated content is displayed in the blog editor for further customization before publishing.
- **AI Moderation**: Comments are automatically moderated by OpenAI’s moderation API. Inappropriate or flagged comments are sent to the Admin Dashboard, where moderators can review and take action.

### Backend Features

- **User Data Collection**: The backend captures and stores user data such as IP address, device type, operating system, and browser information. This is useful for security measures, analytics, and personalization.
- **Password Reset**: The backend verifies if the email exists in the database before sending a password reset link via Firebase, protecting the system from potential abuse and malicious reset attempts.
- **Age Verification**: The backend checks the user's date of birth to enforce that users under 13 are denied from registering, ensuring compliance with legal guidelines (e.g., COPPA).
- **Password Hashing**: User passwords are securely hashed using **bcryptjs** before being saved in the database.
- **Device Logging**: The backend logs device and browser information during registration and login to maintain a secure environment and monitor user activities.
- **MongoDB Storage**: All user data is stored in MongoDB, ensuring scalability and flexibility for large datasets.
- **Game Data Collection**: The backend records and stores user game statistics such as scores, wins, losses, game durations, and other relevant data.
- **User Game History**: Users can view their game history and performance statistics.
- **OpenAI Chatbot Integration**: The backend communicates with OpenAI to process and generate responses for user interactions with the chatbot, enhancing engagement without storing conversation history.
- **Comment Sentiment Storage**: Sentiment analysis for blog comments is performed via OpenAI, with sentiment data (positive, neutral, or negative) and probability scores securely stored in MongoDB for each comment.
- **AI-Generated Content**: The backend facilitates interaction with OpenAI’s GPT model, generating blog post content based on user-provided prompts. The generated content is processed and returned to the frontend for customization and publication.
- **AI Moderation**: The backend integrates OpenAI’s moderation API to flag inappropriate content in blog posts and comments. Flagged content is stored in MongoDB and displayed on the Admin Dashboard for review by moderators.
- **Shopping Cart**:
  - The backend tracks the user's cart, storing the items they have added, and updating the cart when items are removed or quantities are changed.
  - The backend also processes Stripe payment intents and records successful transactions, including payment status, cart contents, and user details.
- **Order History**: After checkout, the user's order history is saved, including the items purchased, total price, and payment status.
- **Blog**:
  - The backend handles all CRUD operations (Create, Read, Update, Delete) for blog posts.
  - It stores all posts and comments, linking them to the appropriate user accounts.
  - Each post includes metadata such as the creation date, author, and update history.

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
- openai

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
- npm install @tensorflow/tfjs
- npm install @tensorflow-models/mobilenet

## Privacy Policy and Data Collection

### OpenAI Chatbot Integration

The backend integrates with OpenAI to process and generate dynamic responses for user interactions with the chatbot. In addition to generating real-time responses, the backend collects and stores important metadata related to each interaction, such as:

- **User Input**: The exact text entered by the user during the interaction.
- **Timestamp**: The exact date and time when the interaction occurred.
- **Device Metadata**: Details about the user’s device, including browser type, operating system, and device type (e.g., mobile, desktop).
- **IP Address**: The user’s IP address for security and location tracking purposes.

While the chatbot interaction itself is not stored, these metadata points are crucial for maintaining analytics, tracking user interaction trends, and ensuring personalized engagement. The OpenAI API is used to power the chatbot, but conversation histories are deliberately not retained to protect user privacy.

### AI-Generated Content and Moderation

#### AI-Generated Content

Users may use OpenAI’s API to generate blog posts based on prompts or keywords. When a user generates content, the following data is collected:

- **Generated Content**: The AI-generated content is stored in the backend to display on the frontend before user approval.
- **Timestamp**: The exact date and time when the content was generated.
- **Author Information**: The user’s details, including their email or user ID, are associated with the generated content for accountability.

#### AI Moderation and Flagging

Content submitted by users, including blog posts and comments, undergoes moderation through OpenAI’s API. The moderation API evaluates content for potentially harmful or inappropriate material, flagging it if necessary. The following data is collected during moderation:

- **Content Evaluated**: The exact text being evaluated by the moderation API (e.g., comments or blog posts).
- **Moderation Results**: The flagged categories (e.g., violence, hate speech, etc.) and the confidence level for each category.
- **Flagged Status**: Whether the content is flagged as inappropriate based on OpenAI's moderation criteria.
- **Timestamp**: The exact date and time when the moderation occurred.
- **Author Information**: The user’s details, including their email or user ID, are associated with the flagged content for accountability.

Flagged content is stored securely in MongoDB and can be reviewed by administrators through the Admin Dashboard.

### Comment Sentiment Analysis and Storage

Every comment made on a blog post undergoes sentiment analysis using OpenAI’s API. The backend collects the following data for each comment:

- **Sentiment Type**: The comment is categorized as positive, neutral, or negative based on its content.
- **Sentiment Probabilities**: Probabilities for each sentiment type (positive, neutral, and negative) are calculated and stored as percentage scores.
- **Comment Content**: The actual text of the user’s comment.
- **Author Information**: The user’s details, including their email or user ID, are associated with the comment for accountability.
- **Timestamp**: The date and time when the comment was created and analyzed.
- **IP Address**: The user’s IP address is stored for security and monitoring purposes.
- **Device Metadata**: Information about the user’s browser, operating system, and device is captured during the comment submission.

This data is securely stored in MongoDB and displayed on the Admin Dashboard, providing a comprehensive overview of user sentiment and engagement across blog posts. This includes detailed sentiment breakdowns (positive, neutral, and negative) along with metadata about the comment and its author, helping administrators understand user feedback trends more effectively.

### Additional Data Collected

- **User Information**: During the user registration process, the system collects personal information such as the user’s first name, last name, email, date of birth, and phone number. This data is securely stored in MongoDB and used for personalized experiences and account management.
- **Login History**: Every login event is tracked with timestamps and device metadata to provide detailed records of user activity.
- **Game Statistics**: For users playing the integrated games (e.g., Blackjack, Memory Matching, Simon Says), the backend collects data such as scores, turns taken, games played, wins, losses, highest levels achieved, and more. This data is stored and displayed for users and administrators to track performance and progress.
- **Transaction Data**: When users make purchases through the shopping cart, the backend collects transaction details, including the items purchased, total price, shipping address, payment status, and Stripe payment intent ID. These details are securely stored in MongoDB.

## How to Run the Project

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v16+)
- **MongoDB** (either locally or use a cloud service like MongoDB Atlas)
- **Firebase** account for authentication
- **NewsData.io** API key
- **Stripe** Public API Key and Private API Key
- **OpenAI** API key

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

## Future Enhancements:

These features will be added in future releases. Suggestions are welcomed.

- **Personalized User Feed**: Integrate free APIs to create a tailored content feed for each user.
- **Chat Feature**: Implement direct messaging functionality to allow users to communicate in real-time.
- **AI Image Generator**: Integrate an AI-powered image generator for user interactions or creative features.
- **AI Bot**: Add an AI bot to assist users or provide dynamic interactions.
- **Lore History Section**: Develop a detailed lore/history section with categorized sublinks for easy navigation.
- **Help/Contact Section**: Create a help and contact page to provide user support and FAQs.

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
