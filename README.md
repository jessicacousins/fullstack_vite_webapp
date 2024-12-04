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
![OpenAI](https://img.shields.io/badge/OpenAI-Chatbot%20%26%20AI%20Features-purple)
![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-Image%20Classifier-orange)
![Three.js](https://img.shields.io/badge/Three.js-3D%20Graphics-blueviolet)
![React Router](https://img.shields.io/badge/React%20Router-Navigation-blue)
![Bcrypt.js](https://img.shields.io/badge/Bcrypt.js-Password%20Hashing-green)
![Uuid](https://img.shields.io/badge/Uuid-Unique%20IDs-lightgrey)
![Request-IP](https://img.shields.io/badge/Request--IP-User%20Location-brightgreen)
![UserAgent](https://img.shields.io/badge/UserAgent-Device%20Details-orange)
![NewsData.io](https://img.shields.io/badge/NewsData.io-API-blue)
![OpenAI API](https://img.shields.io/badge/OpenAI-API%20Integration-purple)
![Stripe API](https://img.shields.io/badge/Stripe-API%20Integration-blueviolet)

## Project Description

This is a full-stack **Vite** application built with **React**, **Node.js**, **Express**, **MongoDB**, and **Stripe**. It includes a variety of features such as:

- **Authentication**: Utilizes **Firebase** for secure user authentication.
- **Mini-Games**: Offers engaging games like Blackjack, Memory Matching, and Simon Says.
- **Blog Platform**: Supports blog creation with full CRUD functionality, allowing users to read, write, update, and delete posts.
- **Shopping Cart**: Includes a shopping cart with secure **Stripe** payment processing.
- **AI-Driven Features**: Integrates **OpenAI** for automatic moderation of user-generated content. Comments are flagged for inappropriate language, and AI-generated content suggestions assist in blog post creation.
- **Admin Dashboard**: Provides moderators with a comprehensive view of flagged content, alongside sentiment analysis for user interactions.
- **Soundboard** with AI-Generated Music: Features a soundboard offering AI-generated music tracks. Users can play, pause, and stop sounds and save playlists for future playback.
- **Achievement Tracking**: Tracks user actions in blogs, games, and shopping linked to the corresponding user account

### Enhanced Features

In addition to the core functionalities, this project also integrates **TensorFlow.js** with the **MobileNet Classifier**, which brings **machine learning** capabilities directly to the frontend. In the shopping cart component, users can click on merchandise images, and the MobileNet model will classify these items into general categories, offering real-time feedback on the predicted label.

The **"Learn More"** button provides users with additional product insights, including the identified label from the MobileNet model and recommendations for similar items. The recommendation system, powered by **OpenAI**, suggests products based on the items currently in the user's cart. It uses the `getProductRecommendations` function to dynamically suggest relevant products based on user interests and previous purchases.

User activity, including viewed products and preferences, is logged in the backend, enabling the app to offer more personalized suggestions over time. This personalized recommendation feature enhances the shopping experience by presenting users with products they may be interested in, based on items already in their cart.

---

This project demonstrates the power of combining machine learning, real-time AI-driven features, and user-driven recommendations to create an interactive and engaging e-commerce experience.

## Table of Contents

- [Project Description](#project-description)
- [OpenAI Integration](#openai-integration)
- [Machine Learning with TensorFlow.js](#machine-learning-with-tensorflow-js)
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

The objective of this **MERN** stack project is to create an immersive **fullstack** experience that leverages a rich set of modern technologies and features to deliver an engaging and comprehensive platform. This includes a sophisticated user interface with multiple interactive elements, such as a blog platform with **AI-powered sentiment analysis** and **AI-generated content** via OpenAI, a series of **mini-games** (Blackjack, Matching, and Simon Says), and a fully functional **shopping cart** with **Stripe** payment processing.

User interactions are closely monitored and enhanced through **AI moderation** to flag inappropriate content, providing a safe environment for engagement. All user interactions, including blog comments, are analyzed for sentiment (positive, neutral, or negative) and tracked within **MongoDB** for review through a detailed **Admin Dashboard**. A **soundboard** with AI-generated music, allowing users to save and manage playlists while interacting with a dynamic audio experience.
The **Achievement System**, rewards user milestones across games, blogs, and the shopping experience. This system gamifies user engagement, encouraging active participation and fostering a sense of accomplishment.

The platform securely manages user data, including personal information, device and browser details, IP addresses, and product view history, which drives **personalized recommendations**. Data storage and handling comply with strict **privacy and legal standards**, including age verification. A robust **password reset** mechanism further ensures security, validating email authenticity before triggering password reset actions. All features are designed with privacy and security as a priority, creating an immersive, AI-enhanced environment that goes beyond basic **authentication** and **user management**.

## OpenAI Integration

This project includes several advanced AI features powered by OpenAI, with proper attribution to OpenAI provided according to their usage guidelines.

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

### AI Product Recommendations

- **Real-Time Suggestions and Interest Tracking**: The system provides real-time feedback on product categories and suggests similar items, enriching user experience with AI-driven recommendations. Additionally, viewed product data is logged in the backend, allowing tailored suggestions based on user interests.
- **Learn More Details**: When users click on the "Learn More" button for a product, they receive a detailed, AI-generated post about the item, including relevant information and insights. This provides users with an enriched, informative view of the product they are currently exploring

### Legal Attribution for OpenAI

This project utilizes OpenAI services for AI-driven chatbot interactions and comment sentiment analysis. OpenAI’s API powers both of these features, and proper credit is given for their services in accordance with OpenAI’s usage guidelines. For more details on OpenAI’s terms, please refer to their [API Terms of Use](https://openai.com/policies/terms-of-use/).

## Machine Learning with TensorFlow JS

### What is Machine Learning?

Machine learning is a field of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. By processing vast amounts of data, machine learning models can recognize patterns and make predictions, which can then be applied to tasks such as image recognition, natural language processing, and more.

### What is TensorFlow?

TensorFlow is an open-source machine learning library developed by Google, enabling developers to build and deploy machine learning models easily. TensorFlow.js allows for running these models directly in the browser, providing a powerful toolset for incorporating AI on the frontend without requiring a backend server to handle predictions.

### TensorFlow.js and MobileNet Integration

Using TensorFlow.js, this project includes the MobileNet model for on-device image recognition. MobileNet is a lightweight, efficient neural network model designed for mobile and embedded applications, optimized to handle real-world images and general object classification. Integrated within the shopping cart, this feature allows users to identify categories of merchandise through direct interaction, enhancing the overall shopping experience with intelligent AI-driven insights.

### Legal Attribution for TensorFlow.js and MobileNet

This project uses **TensorFlow.js**, an open-source machine learning library developed by Google, licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). TensorFlow.js enables machine learning capabilities directly in the browser, providing the foundation for real-time image classification within this project.

The **MobileNet model** used in this project is also developed by Google and licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). MobileNet is a pre-trained model optimized for object classification, integrated here to enhance the shopping experience by identifying merchandise categories.

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
- **View Cart**: Users can view their selected items, adjust quantities, remove items, and see a running total of their purchase.
- **Checkout**: Users can securely process payments using Stripe, with real-time integration and error handling.
- **Data Tracking**: All user transactions, including cart items, total amount, and payment status, are recorded in MongoDB, allowing for comprehensive tracking and data management.

This comprehensive shopping flow provides users with a streamlined and personalized e-commerce experience, backed by secure and reliable payment processing through **Stripe** and enhanced by a **recommendation system** that adapts to user interests and cart contents.

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
17. **TensorFlow.js Image Classification**: TensorFlow.js is integrated into the frontend to enable machine learning capabilities directly in the browser. Using the MobileNet model, this feature allows users to classify and identify categories of merchandise images in the shopping component with real-time feedback. When a user clicks on an item, the model predicts the item’s category, providing insights into the types of products available. This implementation demonstrates basic machine learning concepts and enhances the shopping experience with interactive AI-driven categorization.
18. **Learn More Insights**: When users click the “Learn More” button for an item in the shopping cart, they receive an AI-generated description and insights about the product. This feature, powered by OpenAI, offers additional context on the product's uses, features, and related categories, enhancing the shopping experience.
19. **Product Recommendations**: Based on the products users views, the system provides AI-driven recommendations for similar items. This feature uses OpenAI to generate recommendations tailored to user preferences. Product views are logged in the backend, allowing the application to suggest relevant items based on users' browsing patterns.
20. **Soundboard**: The backend stores user-created playlists, including the track information, user clicks, and playback history.
21. **Achievement Tracking:**: Tracks user actions in blogs, games, and shopping. Includes APIs for fetching user achievements, adding new ones, and displaying progress.

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
- **TensorFlow.js**: A JavaScript library that allows machine learning to be run directly in the browser. TensorFlow.js powers the machine learning capabilities for real-time image classification on the frontend.
- **MobileNet Classifier**: A pre-trained model integrated with TensorFlow.js to classify merchandise images within the shopping component. When users click on an item, the MobileNet model predicts its category, providing immediate AI-driven insights into the type of product.
- **Product Recommendations**: When users click the “Learn More” button on an item in the shopping cart, OpenAI generates personalized product recommendations based on the selected item. This feature provides real-time feedback on similar items and displays AI-generated insights about the product being viewed.

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
- **Product View Logging**: Each time a user views a product, relevant data (such as product ID, category, and timestamp) is logged in MongoDB. This stored view history helps generate personalized product recommendations and tracks user interests for tailored suggestions.

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
- **Machine Learning**: Enables real-time image classification within the shopping cart, providing users with AI-driven insights on merchandise categories through TensorFlow.js and the MobileNet model.
- **Product Recommendations and Insights**: When users click "Learn More" on a product, they receive AI-generated insights and related product recommendations, enhancing the shopping experience.
- **Soundboard**: Includes a fully interactive soundboard with AI-generated music. Features save functionality for user playlists, integrated with the backend. Allows users to manage and retrieve their saved playlists dynamically.

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
- **Product View Logging**: The backend logs each product view, capturing details like product ID and category, to enable personalized product recommendations based on user interests.
- **Achievement system**: Handles tracking, storage, and retrieval of user achievements. Connects milestones in games, blogs, and shopping to achievement progress.
- **Soundboard**: Enables CRUD operations for user-created playlists. Handles secure storage of playlist metadata and associated tracks in MongoDB.
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
- Bcryptjs
- Request-IP
- Useragent
- Axios
- Stripe
- Uuid
- OpenAI
- npm install multer
- npm install @tensorflow/tfjs-node

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
- TensorFlow.js
- MobileNet Model
- npm install react-loading

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

### Product View Logging and Recommendations

To enhance the personalized shopping experience, the system logs details each time a user views a product. This data enables targeted product recommendations and insights based on user behavior. The following data is collected and stored:

- **Product Details**: Information about the viewed product, including its ID, title, and category.
- **User Interaction History**: A record of each product viewed by the user, allowing for tailored recommendations based on browsing history.
- **Timestamp**: The date and time of each product view to track recent interactions.
- **User Metadata**: The user’s ID or email is associated with each product view, helping to build personalized suggestions.

This data is stored in MongoDB and is used to generate real-time product recommendations and insights when users click "Learn More" on an item in the shopping cart, providing a customized and enriched shopping experience.

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
